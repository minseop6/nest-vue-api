
import { Module, forwardRef } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AuthService } from '../../modules/auth/auth.service';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, AuthService, UserDto],
})
export class UserModule {}