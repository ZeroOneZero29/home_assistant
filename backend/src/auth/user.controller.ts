import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { UserRegDto, UserLoginDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/reg')
  public async regestrationUser(@Body() userRegDto: UserRegDto) {
    console.log(userRegDto);
    return this.userService.createUser(userRegDto);
  }

  @Post('/login')
  public async loginUser(@Body() userLoginDto: UserLoginDto) {
    console.log(userLoginDto);
    return this.userService.loginUser(userLoginDto);
  }

  @Get('/all')
  public async getUser() {
    return this.userService.getUser();
  }

  @Get('/one')
  public async getOneUser(@Body() loginUserDto: UserRegDto) {
    return this.userService.getOneUser(loginUserDto);
  }
}
