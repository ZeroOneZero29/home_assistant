import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get('/info')
  public async getInfoAllDevice() {
    return this.deviceService.getInfoDevice();
  }

  @Get('/info_device')
  public async getInfoDeviceId(@Query() deviceDto: DeviceDto) {
    console.log(deviceDto.deviceID);
    const id = deviceDto.deviceID;
    return this.deviceService.getInfoDeviceById(id);
  }

  @Post('/action')
  public async changeStateDevice(@Query() deviceDto: DeviceDto) {
    const id = deviceDto.deviceID;
    return this.deviceService.changeStateDevice(id);
  }
}
