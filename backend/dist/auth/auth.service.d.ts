import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto, UserLoginDto, UserRegDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
interface Tokens {
    accessToken: string;
    refreshToken: string;
}
interface TokensAcceess {
    accessToken: string;
}
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    logUp(userRegDto: UserRegDto): Promise<import("../entity/user.entity").User>;
    logIn(userLoginDto: UserLoginDto): Promise<Tokens>;
    updateAccessTokens(refreshToken: string): Promise<any>;
    genTokensAcceess(userInfo: object): Promise<TokensAcceess>;
    genTokens(user: CreateTokenDto): Promise<Tokens>;
}
export {};
