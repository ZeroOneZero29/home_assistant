import { UserRegDto, UserLoginDto, UserTokenDto } from './user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    createUser(userToDB: UserRegDto): Promise<User>;
    loginUser(userTokenDto: UserTokenDto): Promise<any>;
    updateTokensRefresh(userTokenDto: UserTokenDto): Promise<any>;
    getUser(): Promise<User[]>;
    getOneUser(loginUser: UserLoginDto): Promise<any>;
}
