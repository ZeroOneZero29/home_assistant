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
    getInfoDevice(accessToken: string): Promise<any>;
    getInfoDeviceById(deviceDto: number, accessToken: string): Promise<any>;
    changeStateDevice(deviceDto: number, accessToken: string): Promise<string>;
}
