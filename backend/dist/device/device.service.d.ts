import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class DeviceService {
    private httpService;
    private configService;
    constructor(httpService: HttpService, configService: ConfigService);
    getInfoDevice(): Promise<any>;
    getInfoDeviceById(deviceDto: number): Promise<any>;
    changeStateDevice(deviceDto: number): Promise<string>;
}
