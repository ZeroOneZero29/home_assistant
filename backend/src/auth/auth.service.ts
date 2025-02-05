import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthRegDto } from './auth.dto';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async createUser(authRegDto: AuthRegDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(authRegDto.password, 10);
    authRegDto.password = hashPassword;
    console.log(authRegDto);

    const user = this.userRepository.create(authRegDto);
    return this.userRepository.save(user);
  }

  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneUser(loginUser: AuthRegDto): Promise<any> {
    const { email, password } = loginUser;
    //console.log(email);
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`Пользователь с данным ${email} не найден`);
    }
    const salt = await bcrypt.genSalt();
    const inputPassword = await bcrypt.hash(password, 10);
    console.log(inputPassword);
    if (inputPassword == user.password) {
      return user;
    }
  }
}
//$2b$10$rGdF9BihOZFH.ulowLbFzux/3SwwE048W/7q3czqECOFIHJrna6GC

//$2b$10$TH72vSD7D1HVCGoh0nprue27OrPBTdaNnSL2bjHfO5IBy9q566ley
