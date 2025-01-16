import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserParamsDto } from './dto/user-params.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('users') // Group endpoints under the 'users' tag
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiNotFoundResponse({ description: 'No users found' })
  async getUsers() {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw new NotFoundException('Failed to fetch users');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async getUser(@Param('id') id: string) {
    try {
      return await this.userService.getUser(id);
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param() params: UserParamsDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.updateUser(params.id, updateUserDto);
    } catch (error) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async deleteUser(@Param() params: UserParamsDto) {
    try {
      return await this.userService.deleteUser(params.id);
    } catch (error) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }
  }
}