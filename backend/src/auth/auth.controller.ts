import { Body, Controller, Get, Post, Req, UseGuards, Headers, Res, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRegDto, UserTokenDto } from 'src/user/user.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';
import { Response, Request } from 'express';
import { RefreshTokenStrategy } from './strategy/refresh.token.strategy';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}
interface TokensAcceess {
  accessToken: string;
}
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private refreshTokenStrategy: RefreshTokenStrategy,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('test')
  public async test(@Body() userLoginDto: UserLoginDto) {
    console.log(userLoginDto);
    // return this.authService.genTokens(userLoginDto);
  }

  @Post('reg')
  public async singUp(@Body() userRegDto: UserRegDto) {
    console.log(userRegDto);
    return this.authService.logUp(userRegDto);
  }

  @Post('login')
  public async singIn(@Body() userLoginDto: UserLoginDto): Promise<Tokens> {
    console.log(userLoginDto);
    return this.authService.logIn(userLoginDto);
  }

  @Get('oauth')
  public async getYandexToken(@Query() oauth: string) {}

  @UseGuards(RefreshTokenGuard)
  @Get('/refreshs')
  public async refreshTokensAccess(@Req() request: Request): Promise<TokensAcceess> {
    const [type, token]: any = request.headers.authorization?.split(' ');
    const refreshTokens = type === 'Bearer' ? token : undefined;
    return await this.authService.updateAccessTokens(refreshTokens);
  }
}

//@UseGuards(RefreshTokenGuard)
//@Get('/refresh')
//public async refreshTokens(@Req() request: Request, @Body() body): Promise<Tokens> {
//  const [type, token]: any = request.headers.authorization?.split(' ');
//  console.log(token);
//  const refreshTokens = type === 'Bearer' ? token : undefined;
//  const dateToken = {
//    email: body.email,
//    refreshToken: refreshTokens,
//  };
//  return await this.authService.updateRefreshTokens(dateToken);
//}
