import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { DeviceService } from './device.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { request, Request } from 'express';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/info')
  public async getInfoAllDevice(@Req() request: Request) {
    const [type, token]: any = request.headers.authorization?.split(' ');
    const accessToken = type === 'Bearer' ? token : undefined;
    return await this.deviceService.getInfoDevice(accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/info_device')
  public async getInfoDeviceId(@Query() deviceDto: DeviceDto, @Req() request: Request) {
    const [type, token]: any = request.headers.authorization?.split(' ');
    const accessToken = type === 'Bearer' ? token : undefined;
    const id = deviceDto.id;
    return this.deviceService.getInfoDeviceById(id, accessToken);
  }
  @UseGuards(AccessTokenGuard)
  @Get('/action')
  public async changeStateDevice(@Query() deviceDto: DeviceDto, @Req() request: Request) {
    const [type, token]: any = request.headers.authorization?.split(' ');
    const accessToken = type === 'Bearer' ? token : undefined;
    const id = deviceDto.id;
    return this.deviceService.changeStateDevice(id, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/light-device')
  public async changeStateLightDevice(@Body() deviceId: string[], @Req() request: Request) {
    const [type, token]: any = request.headers.authorization?.split(' ');
    const accessToken = type === 'Bearer' ? token : undefined;
    return this.deviceService.changeLigthDevice(accessToken, deviceId);
  }
}
