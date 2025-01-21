import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user1@example.com',
    description: 'Username or email of the user',
  })
  identifier: string;

  @ApiProperty({
    example: 'password1',
    description: 'Password of the user',
  })
  password: string;
}