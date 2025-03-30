import { AuthService } from './auth.service';
import { UserLoginDto, UserRegDto } from 'src/user/user.dto';
import { Request } from 'express';
import { RefreshTokenStrategy } from './strategy/refresh.token.strategy';
import { OauthToken } from './user-jwt.interfase';
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
    getYandexToken(oauthToken: OauthToken, request: Request): Promise<any>;
    refreshTokensAccess(request: Request): Promise<TokensAcceess>;
}
export {};
