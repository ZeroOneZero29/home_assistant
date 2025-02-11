import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserUpdateDto } from 'src/user/user.dto';
interface Token {
    accessToken: string;
    refreshToken: string;
}
export declare class AuthService {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    genTokens(user: UserUpdateDto): Promise<Token>;
}
export {};
