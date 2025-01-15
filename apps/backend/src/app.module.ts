import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule, DatabaseModule, AuthModule } from '@nx-starterkit/nestjs-lib';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        ENCRYPTION_KEY: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    // AuthModule,
    UserModule, 
    DatabaseModule,
  ]
})
export class AppModule {}