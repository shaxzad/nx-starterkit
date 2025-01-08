import { Injectable } from '@nestjs/common';

@Injectable()
export class NestjsLibService {
  getHello(): string {
    return 'Hello from NestJS Lib!';
  }
}