import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto, UserLoginDto, UserRegDto, UserTokenDto } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RefreshTokenStrategy } from './strategy/refresh.token.strategy';
interface Tokens {
  accessToken: string;
  refreshToken: string;
}
interface TokensAcceess {
  accessToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //async test(): Promise<User[]> {
  //  const data = this.userService.getUser();
  //  return data;
  //}

  async logUp(userRegDto: UserRegDto) {
    const { email } = userRegDto;
    const checkedUser = await this.userService.findByEmail(email);
    if (checkedUser) {
      throw new NotFoundException(`Пользователь ${email} уже существует `);
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userRegDto.password, salt);
    const userToDB = { ...userRegDto, password: hashPassword };
    return await this.userService.createUser(userToDB);
  }

  async logIn(userLoginDto: UserLoginDto) {
    const { password, email } = userLoginDto;
    const checkedUser = await this.userService.findByEmail(email);
    if (!checkedUser) {
      throw new NotFoundException(`Пользователь с данным ${email} не найден!`);
    }
    const passwordVerified = await bcrypt.compare(password, checkedUser.password);
    if (!passwordVerified) {
      throw new NotFoundException(`Пароль для пользователя ${email} не верный!`);
    }
    const payloadTokens = {
      email: checkedUser.email,
      id: checkedUser.id,
    };
    const tokens = await this.genTokens(payloadTokens);
    const tokenSalt = await bcrypt.genSalt();
    const refreshTokenEncrypt = await bcrypt.hash(tokens.refreshToken, tokenSalt);
    const user = await this.userService.loginUser({
      email,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async updateAccessTokens(refreshToken: string): Promise<any> {
    const infoInToken = this.jwtService.decode(refreshToken);
    const payload = {
      sub: infoInToken.sub,
      id: infoInToken.id,
    };
    const tokenAcceess = await this.genTokensAcceess(payload);
    return tokenAcceess;
  }

  async genTokensAcceess(userInfo: object): Promise<TokensAcceess> {
    const payload: object = userInfo;
    const accessToken: string = this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: '1m',
    });
    return { accessToken };
  }

  async genTokens(user: CreateTokenDto): Promise<Tokens> {
    const payload: object = { sub: user.email, id: user.id };

    const accessToken: string = await this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: '1m',
    });

    const refreshToken: string = await this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt_refresh'),
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  //async updateRefreshTokens(userToken: UserTokenDto) {
  //  const user = await this.userService.findByEmail(userToken.email);
  //  if (!user) {
  //    throw new ForbiddenException('Доступ запрещен');
  //  }
  //  const { refreshToken } = userToken;
  //  const refreshTokenVerify = await bcrypt.compare(refreshToken, user.refreshToken);
  //  console.log(refreshTokenVerify);
  //  if (!refreshTokenVerify) {
  //    throw new ForbiddenException('Доступ запрещен');
  //  }
  //  const payloadTokens = {
  //    email: user.email,
  //    id: user.id,
  //  };
  //  const tokens = await this.genTokens(payloadTokens);
  //  console.log(tokens);
  //  const saltToken = await bcrypt.genSalt();
  //  const tokenEncrypt = await bcrypt.hash(tokens.refreshToken, saltToken);
  //  console.log(tokenEncrypt);
  //  const updateTokens = {
  //    email: user.email,
  //    refreshToken: tokenEncrypt,
  //  };
  //  await this.userService.updateTokensRefresh(updateTokens);
  //  return tokens;
  //}
}
