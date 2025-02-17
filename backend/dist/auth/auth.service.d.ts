import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto, UserLoginDto, UserRegDto, UserTokenDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
interface Tokens {
    accessToken: string;
    refreshToken: string;
}
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    logUp(userRegDto: UserRegDto): Promise<import("../entity/user.entity").User>;
    logIn(userLoginDto: UserLoginDto): Promise<Tokens>;
    updateRefreshTokens(userToken: UserTokenDto): Promise<Tokens>;
    genTokens(user: CreateTokenDto): Promise<Tokens>;
}
export {};
