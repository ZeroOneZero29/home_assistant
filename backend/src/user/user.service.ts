import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRegDto, UserLoginDto, UserTokenDto } from './user.dto';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
interface TokensAcceess {
  accessToken: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const emailInDb = await this.userRepository.findOneBy({ email });
    return emailInDb;
  }
  async createUser(userToDB: UserRegDto): Promise<User> {
    const user = this.userRepository.create(userToDB);
    return this.userRepository.save(user);
  }

  //async findUserById(id: number): Promise<User[]> {
  //  return this.userRepository.findBy({ id });
  //}

  async loginUser(userTokenDto: UserTokenDto): Promise<any> {
    const { email, refreshToken } = userTokenDto;
    console.log(refreshToken);
    const user = await this.userRepository.findOneBy({ email });
    const userUpadeToken = await this.userRepository.save({ ...user, refreshToken: refreshToken });
    return userUpadeToken;
  }

  async updateTokensRefresh(userTokenDto: UserTokenDto): Promise<any> {
    const { email, refreshToken } = userTokenDto;
    const user = await this.userRepository.findOneBy({ email });
    console.log(refreshToken);
    const userUpadeToken = await this.userRepository.save({ ...user, refreshToken: refreshToken });
    return userUpadeToken;
  }

  //async updateAccessToken(userToken: string): Promise<User | null> {
  //  const refreshToken = userToken;
  //  const user = await this.userRepository.findOneBy({ refreshToken });
  //  return user;
  //}
  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneUser(loginUser: UserLoginDto): Promise<any> {
    const { email, password } = loginUser;
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
