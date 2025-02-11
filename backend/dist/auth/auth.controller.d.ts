import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/user/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    test(userLoginDto: UserLoginDto): Promise<void>;
}
