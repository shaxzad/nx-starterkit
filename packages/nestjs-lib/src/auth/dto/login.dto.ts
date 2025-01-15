import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Username or email of the user',
  })
  identifier: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
  })
  password: string;
}