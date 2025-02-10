import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';
import { UserLoginDto, UserRegDto } from 'src/user/user.dto';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) //<--- here
    private readonly userService: UserService,
  ) {}

  async test(): Promise<User[]> {
    const data = this.userService.getUser();
    return data;
  }
}
