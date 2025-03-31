import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto, UserLoginDto, UserRegDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';
interface Tokens {
    accessToken: string;
    refreshToken: string;
}
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    logUp(userRegDto: UserRegDto): Promise<User>;
    logIn(userLoginDto: UserLoginDto): Promise<Tokens>;
    pushOauthInDb(accessToken: string, oauthToken: string): Promise<any>;
    updateAccessTokens(refreshToken: string): Promise<any>;
    genTokens(user: CreateTokenDto): Promise<Tokens>;
}
export {};
