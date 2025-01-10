import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { userApiConfig } from './swagger.config';

export function setupSwagger(app: INestApplication) {
  // Swagger for Users API
  const userApiDocument = SwaggerModule.createDocument(app, userApiConfig);
  SwaggerModule.setup('api/docs/users', app, userApiDocument);
}