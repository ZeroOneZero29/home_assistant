import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserRegDto, UserLoginDto, UserTokenDto, CreateTokenDto } from './user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
//
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/reg')
  public async regestrationUser(@Body() userRegDto: UserRegDto) {
    console.log(userRegDto);
    return this.userService.createUser(userRegDto);
  }

  @Post('/login')
  public async loginUser(@Body() userTokenDto: UserTokenDto) {
    console.log(userTokenDto);
    return this.userService.loginUser(userTokenDto);
  }

  @Post('/update')
  public async userUpade(
    @Body() userUpdateDto: CreateTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // const token = await this.userService.updateUser(userUpdateDto);
    //const acessToken = token.accessToken;
    //const refreshToken = token.refreshToken;
    //response.cookie('access', acessToken, {
    //  httpOnly: true,
    //});
    //response.cookie('refresh', refreshToken);
    //response.header(
    //  'Set-Cookie',
    //  `access=${acessToken}; HttpOnly; Secure; SameSite=None; Max-Age=60000; Path=/;`,
    //);
  }

  @Get('/read-cookie')
  readCookie(@Req() request: Request) {
    const cookie = request.cookies['access'];
    return `Read cookie: ${cookie}`;
  }
  @UseGuards(AccessTokenGuard)
  @Get('/all')
  public async getUser() {
    return this.userService.getUser();
  }

  @Get('/one')
  public async getOneUser(@Body() loginUserDto: UserLoginDto) {
    return this.userService.getOneUser(loginUserDto);
  }
}
