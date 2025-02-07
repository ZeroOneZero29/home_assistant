import { DeviceDto } from './device.dto';
import { DeviceService } from './device.service';
export declare class DeviceController {
    private deviceService;
    constructor(deviceService: DeviceService);
    getInfoAllDevice(): Promise<any>;
    getInfoDeviceId(deviceDto: DeviceDto): Promise<any>;
    changeStateDevice(deviceDto: DeviceDto): Promise<string>;
}
