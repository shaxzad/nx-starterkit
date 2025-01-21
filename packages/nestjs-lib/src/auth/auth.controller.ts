import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaService } from '../database/prisma.service';
import { InitialSetupDto } from './dto/initial-setup.dto';
import * as bcrypt from 'bcrypt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user and returns a JWT token for accessing protected endpoints.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'User credentials (username/email and password).',
    examples: {
      example1: {
        summary: 'Example with username',
        value: { identifier: 'admin', password: 'password123' },
      },
      example2: {
        summary: 'Example with email',
        value: { identifier: 'admin@example.com', password: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        tenantId: 'tenant-123',
        branchId: 'branch-123',
        role: 'USER',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials or user not assigned to any branch.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
      },
    },
  })
  async login(@Body() body: { identifier: string; password: string }) {
    const { identifier, password } = body;

    // Find user by username or email
    const user = await this.authService.findByUsernameOrEmail(identifier);
    console.log('User found:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await this.authService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user branch roles
    console.log('Getting user branch roles for user:', user.id);
    const branchRoles = await this.authService.getUserBranchRoles(user.id);
    console.log('Branch roles:', branchRoles);

    if (!branchRoles || branchRoles.length === 0) {
      throw new UnauthorizedException('User is not assigned to any branch');
    }

    const { branchId, role } = branchRoles[0];

    // Generate JWT token
    const token = this.authService.signJWT({
      userId: user.id,
      username: user.username,
      email: user.email,
      tenantId: user.tenantId,
      branchId,
      role,
    });

    return { token, tenantId: user.tenantId, branchId, role };
  }

  @Post('initial-setup')
  @ApiOperation({
    summary: 'Initial system setup',
    description:
      'Performs the initial setup of the system by creating a tenant, branch, and the first admin user.',
  })
  @ApiBody({
    type: InitialSetupDto,
    description: 'Details required for initial system setup.',
    examples: {
      example1: {
        summary: 'Example setup',
        value: {
          tenantName: 'Acme Corp',
          tenantDescription: 'A global organization',
          branchName: 'Headquarters',
          branchDescription: 'Main office',
          username: 'admin',
          email: 'admin@example.com',
          password: 'password123',
          firstName: 'Admin',
          lastName: 'User',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'System initialized successfully',
    schema: {
      example: {
        tenant: {
          id: 'tenant-123',
          name: 'Acme Corp',
          description: 'A global organization',
          createdAt: '2023-10-01T12:00:00.000Z',
        },
        branch: {
          id: 'branch-123',
          name: 'Headquarters',
          description: 'Main office',
          tenantId: 'tenant-123',
          createdAt: '2023-10-01T12:00:00.000Z',
        },
        user: {
          id: 'user-123',
          username: 'admin',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          tenantId: 'tenant-123',
          branchId: 'branch-123',
          createdAt: '2023-10-01T12:00:00.000Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Tenant with the same name already exists',
    schema: {
      example: {
        statusCode: 400,
        message: 'Tenant with the same name already exists',
      },
    },
  })
  async initialSetup(@Body() initialSetupDto: InitialSetupDto) {
    // Check if a tenant with the same name already exists
    const existingTenant = await this.prisma.tenant.findUnique({
      where: { name: initialSetupDto.tenantName },
    });

    if (existingTenant) {
      throw new BadRequestException('Tenant with the same name already exists');
    }

    // Create the tenant
    const tenant = await this.prisma.tenant.create({
      data: {
        name: initialSetupDto.tenantName,
        description: initialSetupDto.tenantDescription,
      },
    });

    // Create the branch
    const branch = await this.prisma.branch.create({
      data: {
        name: initialSetupDto.branchName,
        description: initialSetupDto.branchDescription,
        tenant: {
          connect: { id: tenant.id },
        },
      },
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(initialSetupDto.password, 10);

    // Create the first user and assign them to the branch
    const user = await this.prisma.user.create({
      data: {
        username: initialSetupDto.username,
        email: initialSetupDto.email,
        password: hashedPassword,
        firstName: initialSetupDto.firstName,
        lastName: initialSetupDto.lastName,
        tenant: {
          connect: { id: tenant.id },
        },
        branch: {
          connect: { id: branch.id },
        },
      },
    });

    // Create a profile for the user
    const profile = await this.prisma.profile.create({
      data: {
        bio: 'Initial admin profile',
        user: {
          connect: { id: user.id },
        },
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        profileId: profile.id,
      },
    });

    // Assign a role to the user for the branch
    const role = await this.prisma.role.findUnique({
      where: { name: 'ADMIN' },
    });

    if (!role) {
      throw new BadRequestException('Default role not found');
    }

    await this.prisma.userBranchRole.create({
      data: {
        user: { connect: { id: user.id } },
        branch: { connect: { id: branch.id } },
        role: { connect: { id: role.id } },
      },
    });

    return {
      tenant,
      branch,
      user,
    };
  }
}
