import { AuthService } from './auth.service';
import { UserLoginDto, UserRegDto } from 'src/user/user.dto';
import { Request } from 'express';
import { RefreshTokenStrategy } from './strategy/refresh.token.strategy';
interface Tokens {
    accessToken: string;
    refreshToken: string;
}
interface TokensAcceess {
    accessToken: string;
}
export declare class AuthController {
    private authService;
    private refreshTokenStrategy;
    constructor(authService: AuthService, refreshTokenStrategy: RefreshTokenStrategy);
    test(userLoginDto: UserLoginDto): Promise<void>;
    singUp(userRegDto: UserRegDto): Promise<import("../entity/user.entity").User>;
    singIn(userLoginDto: UserLoginDto): Promise<Tokens>;
    getYandexToken(oauth: string): Promise<void>;
    refreshTokensAccess(request: Request): Promise<TokensAcceess>;
}
export {};
