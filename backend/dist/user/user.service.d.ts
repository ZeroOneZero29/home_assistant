import { UserRegDto, UserLoginDto } from './user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userRegDto: UserRegDto): Promise<User>;
    findUserById(id: number): Promise<User[]>;
    loginUser(userLoginDto: UserLoginDto): Promise<object>;
    updateUser(userLoginDto: UserLoginDto): Promise<User>;
    getUser(): Promise<User[]>;
    getOneUser(loginUser: UserRegDto): Promise<any>;
}
