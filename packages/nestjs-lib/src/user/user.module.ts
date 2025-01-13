import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}