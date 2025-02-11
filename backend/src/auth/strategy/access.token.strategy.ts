import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from '../auth.constants';
import { User } from 'src/entity/user.entity';
import { UserLoginDto } from 'src/user/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: jwtConstants.secretAccess,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  //async validate(payload: number): Promise<User[] | null> {
  //  console.log(payload + 'sa');
  //  const authUser = await this.userService.findUserById(payload);
  //  if (!authUser) {
  //    throw new UnauthorizedException();
  //  }
  //  return authUser;
  //}
  async validate(payload: UserLoginDto) {
    return payload;
  }
}
