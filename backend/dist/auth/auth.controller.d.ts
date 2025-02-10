import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    test(): Promise<import("../entity/user.entity").User[]>;
}
