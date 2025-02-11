import { AuthService } from 'src/auth/auth.service';
import { UserRegDto, UserLoginDto, UserUpdateDto } from './user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
type Token = {
    accessToken: string;
    refreshToken: string;
};
export declare class UserService {
    private authService;
    private userRepository;
    constructor(authService: AuthService, userRepository: Repository<User>);
    createUser(userRegDto: UserRegDto): Promise<User>;
    findUserById(id: number): Promise<User[]>;
    loginUser(userLoginDto: UserLoginDto): Promise<object | undefined>;
    updateUser(userUpdateDto: UserUpdateDto): Promise<Token>;
    getUser(): Promise<User[]>;
    getOneUser(loginUser: UserLoginDto): Promise<any>;
}
export {};
