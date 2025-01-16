import { DocumentBuilder } from '@nestjs/swagger';

export const userApiConfig = new DocumentBuilder()
  .setTitle('Users API')
  .setDescription('The Users API description')
  .setVersion('1.0')
  .addTag('users')
  .build();

export const authApiConfig = new DocumentBuilder()
  .setTitle('Auth API')
  .setDescription('The Auth API description')
  .setVersion('1.0')
  .addTag('auth')
  .build();