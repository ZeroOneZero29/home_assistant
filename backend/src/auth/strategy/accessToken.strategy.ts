import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dad',
    });
  }

  async validate(payload: any) {
    return payload;
  }
  //async validate(payload: any): Promise<User | null> {
  //  const authUser = await this.userService.findUserById(payload);
  //  if (!authUser) {
  //    throw new UnauthorizedException();
  //  }
  //  return authUser;
  //}
}
