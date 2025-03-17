import { Module } from '@nestjs/common';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/access.token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh.token.strategy';
import { UserService } from 'src/user/user.service';

const configService = new ConfigService();
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ global: true }),
    //JwtModule.registerAsync({
    //  global: true,
    //  imports: [ConfigModule],
    //  inject: [ConfigService],
    //  useFactory: (configService: ConfigService) => ({
    //    secret: configService.get('SECRET_KEY'),
    //    signOptions: {
    //      expiresIn: '1d',
    //    },
    //  }),
    //}),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, RefreshTokenStrategy, AuthService, PassportModule],
  exports: [],
})
export class AuthModule {}
