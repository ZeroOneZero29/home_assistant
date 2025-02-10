import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { HttpService, HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError } from 'rxjs';

@Injectable()
export class DeviceService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getInfoDevice() {
    const configAxios = {
      method: 'get',
      headers: {
        Authorization: this.configService.get('yandex'),
      },
    };

    const response = await this.httpService
      .get('https://api.iot.yandex.net/v1.0/user/info', configAxios)
      .toPromise();

    return response?.data;
  }

  async getInfoDeviceById(deviceDto: number) {
    const configAxios = {
      url: `https://api.iot.yandex.net/v1.0/devices/${deviceDto}`,
      method: 'get',
      headers: {
        Authorization: this.configService.get('yandex'),
      },
    };
    const response = await this.httpService.request(configAxios).toPromise();

    return response?.data;
  }

  async changeStateDevice(deviceDto: number) {
    const configAxiosGetInfo = {
      method: 'get',
      headers: {
        Authorization: this.configService.get('yandex'),
      },
    };
    const getStateDevice = await this.httpService
      .get(`https://api.iot.yandex.net/v1.0/devices/${deviceDto}`, configAxiosGetInfo)
      .toPromise();

    const stateDevice = getStateDevice?.data.capabilities[0].state.value;
    console.log(stateDevice);

    const dataChangeStateDevice = JSON.stringify({
      devices: [
        {
          id: '66b1fe19-83e5-429a-9f77-bc4bd1d9f24a',
          actions: [
            {
              type: 'devices.capabilities.on_off',
              state: {
                instance: 'on',
                value: !stateDevice,
              },
            },
          ],
        },
      ],
    });
    const configAxiosChangeStateDevice = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.iot.yandex.net/v1.0/devices/actions',
      headers: {
        Authorization: this.configService.get('yandex'),
        'Content-Type': 'application/json',
      },
      data: dataChangeStateDevice,
    };

    const changeStateDeviceRequst = await this.httpService
      .request(configAxiosChangeStateDevice)
      .toPromise();
    console.log(dataChangeStateDevice);
    return dataChangeStateDevice;
  }
}
