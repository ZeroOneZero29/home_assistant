import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/user/user.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AccessTokenGuard)
  @Post('test')
  public async test(@Body() userLoginDto: UserLoginDto) {
    console.log(userLoginDto);
    // return this.authService.genTokens(userLoginDto);
  }
}
