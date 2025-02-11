import { AuthService } from 'src/auth/auth.service';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRegDto, UserLoginDto, UserUpdateDto } from './user.dto';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
type Token = {
  accessToken: string;
  refreshToken: string;
};
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userRegDto: UserRegDto): Promise<User> {
    const { email } = userRegDto;
    const emailInDb = await this.userRepository.findOneBy({ email });
    if (emailInDb) {
      throw new NotFoundException(`Пользователь ${email} уже существует `);
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userRegDto.password, salt);

    const userToDB = {
      name: userRegDto.name,
      email: userRegDto.email,
      password: hashPassword,
    };

    console.log(userRegDto);
    const user = this.userRepository.create(userToDB);

    return this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User[]> {
    return this.userRepository.findBy({ id });
  }

  async loginUser(userLoginDto: UserLoginDto): Promise<object | undefined> {
    try {
      const { email, password } = userLoginDto;
      console.log(email);
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException(`Пользователь с данным ${email} не найден!`);
      }
      const passwordVerified = await bcrypt.compare(password, user.password);
      if (!passwordVerified) {
        throw new NotFoundException(`Пароль для пользователя ${email} не верный!`);
      }
      const jwtToken = await this.authService.genTokens(userLoginDto);
      const { accessToken, refreshToken } = jwtToken;
      user.refreshToken = refreshToken;
      await this.userRepository.save(user);
      console.log(accessToken);
      const requreData = {
        email,
        name: user.name,
        accessToken,
        refreshToken,
      };
      return requreData;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateUser(userUpdateDto: UserUpdateDto): Promise<Token> {
    const { email } = userUpdateDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`Пользователь с данным ${email} не найден`);
    }
    const jwtToken = await this.authService.genTokens(userUpdateDto);
    const { accessToken, refreshToken } = jwtToken;
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
    console.log(jwtToken);

    return jwtToken;
  }

  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneUser(loginUser: UserLoginDto): Promise<any> {
    const { email, password } = loginUser;
    //console.log(email);
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`Пользователь с данным ${email} не найден`);
    }
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify) {
      throw new NotFoundException(`Неверно введен пароль`);
    }
    return user;
  }
}
//$2b$10$rGdF9BihOZFH.ulowLbFzux/3SwwE048W/7q3czqECOFIHJrna6GC

//$2b$10$TH72vSD7D1HVCGoh0nprue27OrPBTdaNnSL2bjHfO5IBy9q566ley
