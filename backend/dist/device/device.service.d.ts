import { ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class DeviceService {
    private userService;
    private httpService;
    private configService;
    private jwtService;
    constructor(userService: UserService, httpService: HttpService, configService: ConfigService, jwtService: JwtService);
    checkOauthToken(accessToken: string): Promise<User | null>;
    getInfoDevice(accessToken: string): Promise<any>;
    getInfoDeviceById(deviceDto: number, accessToken: string): Promise<ForbiddenException | undefined>;
    changeStateDevice(deviceDto: number, accessToken: string): Promise<string | ForbiddenException>;
}
