import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)], // Use forwardRef to handle circular dependency
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService
})
export class UserModule {}