import { UserRegDto, UserLoginDto } from './user.dto';
import { User } from 'src/entity/user.entity';
export declare class UserService {
    private userRepository;
    createUser(userRegDto: UserRegDto): Promise<User>;
    loginUser(userLoginDto: UserLoginDto): Promise<object>;
    updateUser(userLoginDto: UserLoginDto): Promise<User>;
    getUser(): Promise<User[]>;
    getOneUser(loginUser: UserRegDto): Promise<any>;
}
