import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthRegDto, LoginUserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/reg')
  public async regestrationUser(@Body() authRegDto: AuthRegDto) {
    console.log(authRegDto);
    return this.authService.createUser(authRegDto);
  }

  @Get('/all')
  public async getUser() {
    return this.authService.getUser();
  }

  @Get('/one')
  public async getOneUser(@Body() loginUserDto: AuthRegDto) {
    return this.authService.getOneUser(loginUserDto);
  }
}
