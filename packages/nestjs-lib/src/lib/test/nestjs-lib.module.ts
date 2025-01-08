
import { Module } from '@nestjs/common';
import { NestjsLibService } from './nestjs-lib.service';

@Module({
  providers: [NestjsLibService],
  exports: [NestjsLibService],
})
export class NestjsLibModule {}