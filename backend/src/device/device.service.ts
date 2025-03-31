import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DeviceService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async checkOauthToken(accessToken: string): Promise<string | null> {
    const tokenDecode = this.jwtService.decode(accessToken);
    const email = tokenDecode.sub;
    const user: User | null = await this.userService.findByEmail(email);
    if (!user?.oauthToken) {
      throw new ForbiddenException('Токена нет');
    }
    return user.oauthToken;
  }

  async getInfoDevice(accessToken: string) {
    const oauthToken = await this.checkOauthToken(accessToken);
    const configAxios = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${oauthToken}`,
      },
    };
    console.log();
    const response = this.httpService.get('https://api.iot.yandex.net/v1.0/user/info', configAxios);

    return response
      .toPromise()
      .then((res) => {
        return res?.data;
      })
      .catch((e) => {
        if (e.status == 401) {
          throw new ForbiddenException('Токен не валиден');
        }
      });

    //response.subscribe({
    //  next: (value) => {
    //    console.log(value);
    //  },
    //  error: (err) => {
    //    console.log(err);
    //  },
    //});

    //response.subscribe();

    //return response.subscribe({
    //  next: (value) => {
    //    console.log(value);
    //  },
    //  error: (err) => {
    //    if (err.status == 401) {
    //      return new ForbiddenException('Oauth токен не валиден, попробуйте снова');
    //    }
    //  },
    //});

    //return response.subscribe(
    //  (res) => console.log(res),
    //  (err) => {
    //    console.log(err.status);
    //    return err.status;
    //  },
    //);
  }

  async getInfoDeviceById(deviceDto: string, accessToken: string) {
    console.log(deviceDto);
    const oauthToken = await this.checkOauthToken(accessToken);
    const configAxios = {
      url: `https://api.iot.yandex.net/v1.0/devices/${deviceDto}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${oauthToken}`,
      },
    };
    const response = await this.httpService.request(configAxios);

    return response
      .toPromise()
      .then((res) => {
        return res?.data;
      })
      .catch((e) => {
        if (e.status == 401) {
          throw new ForbiddenException('Токен не валиден');
        }
      });
  }

  async changeStateDevice(deviceDto: string, accessToken: string) {
    const oauthToken = await this.checkOauthToken(accessToken);
    const configAxiosGetInfo = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${oauthToken}`,
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
