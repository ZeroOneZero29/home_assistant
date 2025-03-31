import { DeviceDto } from './device.dto';
import { DeviceService } from './device.service';
import { Request } from 'express';
export declare class DeviceController {
    private deviceService;
    constructor(deviceService: DeviceService);
    getInfoAllDevice(request: Request): Promise<any>;
    getInfoDeviceId(deviceDto: DeviceDto, request: Request): Promise<any>;
    changeStateDevice(deviceDto: DeviceDto, request: Request): Promise<string>;
}
