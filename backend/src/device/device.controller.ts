import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { DeviceService } from './device.service';
import { NotFoundError } from 'rxjs';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/info')
  public async getInfoAllDevice() {
    return this.deviceService.getInfoDevice();
  }
  @UseGuards(AccessTokenGuard)
  @Get('/info_device')
  public async getInfoDeviceId(@Query() deviceDto: DeviceDto) {
    try {
      console.log(deviceDto.deviceID);
      const id = deviceDto.deviceID;
      return this.deviceService.getInfoDeviceById(id);
    } catch (err: unknown) {
      throw new InternalServerErrorException(err);
    }
  }
  @UseGuards(AccessTokenGuard)
  @Post('/action')
  public async changeStateDevice(@Query() deviceDto: DeviceDto) {
    const id = deviceDto.deviceID;
    return this.deviceService.changeStateDevice(id);
  }
}
