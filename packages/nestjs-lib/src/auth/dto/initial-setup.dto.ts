import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InitialSetupDto {
  @ApiProperty({
    description: 'Name of the tenant (business/organization)',
    example: 'Acme Corp',
  })
  @IsString()
  @IsNotEmpty()
  tenantName: string;

  @ApiPropertyOptional({
    description: 'Optional description for the tenant',
    example: 'A global organization',
  })
  @IsString()
  tenantDescription?: string;

  @ApiProperty({
    description: 'Name of the branch',
    example: 'Headquarters',
  })
  @IsString()
  @IsNotEmpty()
  branchName: string;

  @ApiPropertyOptional({
    description: 'Optional description for the branch',
    example: 'Main office',
  })
  @IsString()
  branchDescription?: string;

  @ApiProperty({
    description: 'Username for the first user',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email for the first user',
    example: 'admin@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the first user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'First name of the first user',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the first user',
    example: 'User',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
