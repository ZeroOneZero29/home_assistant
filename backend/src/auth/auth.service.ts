import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto, UserRegDto, UserUpdateDto } from 'src/user/user.dto';

interface Token {
  accessToken: string;
  refreshToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //async test(): Promise<User[]> {
  //  const data = this.userService.getUser();
  //  return data;
  //}

  async genTokens(user: UserUpdateDto): Promise<Token> {
    console.log(user);

    const payload: object = { sub: user.email };
    console.log(payload);

    const accessToken: string = this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: '3d',
    });

    const refreshToken: string = this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt_refresh'),
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }
}
