import { Module } from '@nestjs/common';
import { AppController } from './api/test/app.controller';
import { AppService } from './services/test/app.service';
import { NestjsLibModule, UserModule, DatabaseModule } from '@nx-starterkit/nestjs-lib';

@Module({
  imports: [NestjsLibModule, UserModule, DatabaseModule], // Import DatabaseModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}