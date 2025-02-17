import { AuthService } from './auth.service';
import { UserLoginDto, UserRegDto } from 'src/user/user.dto';
import { Request } from 'express';
interface Tokens {
    accessToken: string;
    refreshToken: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    test(userLoginDto: UserLoginDto): Promise<void>;
    singUp(userRegDto: UserRegDto): Promise<import("../entity/user.entity").User>;
    singIn(userLoginDto: UserLoginDto): Promise<Tokens>;
    refreshTokens(request: Request, body: any): Promise<Tokens>;
}
export {};
