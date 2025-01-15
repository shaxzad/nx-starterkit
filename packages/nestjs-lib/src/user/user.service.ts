import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  findOne(arg0: { where: ({ username: string; } | { email: string; })[]; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(createUserDto.password);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUser(id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new NotFoundException(`Invalid user ID: ${id}`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.authService.hashPassword(updateUserDto.password);
    }

    return this.prisma.user.update({
      where: { id: parseInt(id) },
      data: updateUserDto,
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id: parseInt(id) },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (user && this.authService.comparePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async findByUsername(username: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id: 0, email: '', username: { equals: username } },
    });
  }

  async findByUsernameOrEmail(identifier: string): Promise<any> {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier },
        ],
      },
    });
  }
}