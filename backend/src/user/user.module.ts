import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategy/access.token.strategy';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  providers: [JwtStrategy, AuthService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
