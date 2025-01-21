import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  async verifyJWT(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new Error('Token verification failed');
    }
  }

  // Sign a JWT token
  signJWT(payload: object): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    return sign(payload, secret, { expiresIn: '1h' }); // Token valid for 1 hour
  }

  async findByUsername(username: string): Promise<any> {
    return this.userService
      .getUsers()
      .then((users) => users.find((user) => user.email === username));
  }

  async findByUsernameOrEmail(identifier: string): Promise<any> {
    console.log('Finding user by username or email:', identifier);
    try {
      const user = await this.userService.findByUsernameOrEmail(identifier);
      console.log('User found:', user);
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  async getUserBranchRoles(
    userId: string
  ): Promise<{ branchId: string; role: string }[]> {
    console.log('Getting user branch roles for user auth page:', userId);
    const userBranchRoles = await this.prisma.userBranchRole.findMany({
      where: { userId },
      select: { branchId: true, role: { select: { name: true } } },
    });

    return userBranchRoles.map((item) => ({
      branchId: item.branchId,
      role: item.role.name,
    }));
  }
}
