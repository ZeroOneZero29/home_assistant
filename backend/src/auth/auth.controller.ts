import { Body, Controller, Get, Post, Req, UseGuards, Headers, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRegDto, UserTokenDto } from 'src/user/user.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';
import { Response, Request } from 'express';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AccessTokenGuard)
  @Post('test')
  public async test(@Body() userLoginDto: UserLoginDto) {
    console.log(userLoginDto);
    // return this.authService.genTokens(userLoginDto);
  }

  @Post('singup')
  public async singUp(@Body() userRegDto: UserRegDto) {
    return this.authService.logUp(userRegDto);
    console.log(userRegDto);
  }

  @Post('singin')
  public async singIn(@Body() userLoginDto: UserLoginDto): Promise<Tokens> {
    console.log(userLoginDto);
    return this.authService.logIn(userLoginDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  public async refreshTokens(@Req() request: Request, @Body() body): Promise<Tokens> {
    const [type, token]: any = request.headers.authorization?.split(' ');
    console.log(token);
    const refreshTokenz = type === 'Bearer' ? token : undefined;
    const dateToken = {
      email: body.email,
      refreshToken: refreshTokenz,
    };
    return await this.authService.updateRefreshTokens(dateToken);
  }
}
