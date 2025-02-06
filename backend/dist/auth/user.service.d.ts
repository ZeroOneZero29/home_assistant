import { UserRegDto, UserLoginDto } from './user.dto';
import { User } from 'src/entity/user.entity';
export declare class UserService {
    private userRepository;
    createUser(userRegDto: UserRegDto): Promise<User>;
    loginUser(userLoginDto: UserLoginDto): Promise<object>;
    getUser(): Promise<User[]>;
    getOneUser(loginUser: UserRegDto): Promise<any>;
}
