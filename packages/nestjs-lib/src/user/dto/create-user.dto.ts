import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique email address of the user',
    example: 'user11@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the user account (minimum 6 characters)',
    example: 'passwoord11',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'Elaven',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The unique username of the user',
    example: 'user_eleven',
  })
  @IsString()
  username: string;
}
