import { DocumentBuilder } from '@nestjs/swagger';

export const userApiConfig = new DocumentBuilder()
  .setTitle('Users API')
  .setDescription('The Users API description')
  .setVersion('1.0')
  .addTag('users')
  .build();