import { UserRegDto, UserLoginDto, UserTokenDto, OauthTokenDto } from './user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    createUser(userToDB: UserRegDto): Promise<User>;
    loginUser(userTokenDto: UserTokenDto): Promise<any>;
    updateOauthToken(oauthTokenDto: OauthTokenDto): Promise<any>;
    updateTokensRefresh(userTokenDto: UserTokenDto): Promise<any>;
    getUser(): Promise<User[]>;
    getOneUser(loginUser: UserLoginDto): Promise<any>;
}
