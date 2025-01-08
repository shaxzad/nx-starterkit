import { Module } from '@nestjs/common';
import { AppController } from './test/app.controller';
import { AppService } from '../services/test/app.service';
import { NestjsLibModule } from '@nx-starterkit/nestjs-lib';

@Module({
  imports: [NestjsLibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
