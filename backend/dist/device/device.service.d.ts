import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class DeviceService {
    private userService;
    private httpService;
    private configService;
    private jwtService;
    constructor(userService: UserService, httpService: HttpService, configService: ConfigService, jwtService: JwtService);
    checkOauthToken(accessToken: string): Promise<string | null>;
    getInfoDevice(accessToken: string): Promise<any>;
    getInfoDeviceById(deviceDto: string, accessToken: string): Promise<any>;
    changeStateDevice(deviceDto: string, accessToken: string): Promise<string>;
    changeLigthDevice(accessToken: string, idDevice: string[]): Promise<void>;
}
