import { Global, Module } from '@nestjs/common';
import { PrismaRepository, PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    PrismaRepository,

  ],
  get exports() {
    return this.providers;
  },
})
export class DatabaseModule {}
