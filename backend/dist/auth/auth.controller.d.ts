import { AuthRegDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    regestrationUser(authRegDto: AuthRegDto): Promise<import("../entity/user.entity").User>;
    getUser(): Promise<import("../entity/user.entity").User[]>;
    getOneUser(loginUserDto: AuthRegDto): Promise<any>;
}
