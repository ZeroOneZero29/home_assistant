import { AuthRegDto } from './auth.dto';
import { User } from 'src/entity/user.entity';
export declare class AuthService {
    private userRepository;
    createUser(authRegDto: AuthRegDto): Promise<User>;
    getUser(): Promise<User[]>;
    getOneUser(loginUser: AuthRegDto): Promise<any>;
}
