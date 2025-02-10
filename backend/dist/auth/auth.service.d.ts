import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    test(): Promise<User[]>;
}
