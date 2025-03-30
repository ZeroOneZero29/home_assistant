import {
  ForbiddenException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { HttpService, HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, of, throwError } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { error, log } from 'console';

@Injectable()
export class DeviceService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async checkOauthToken(accessToken: string) {
    const tokenDecode = this.jwtService.decode(accessToken);
    const email = tokenDecode.sub;
    const user: User | null = await this.userService.findByEmail(email);

    return user;
  }

  async getInfoDevice(accessToken: string) {
    const user = await this.checkOauthToken(accessToken);
    if (!user!.oauthToken) {
      return new ForbiddenException('Oauth токена нет');
    }
    const oauthToken = user?.oauthToken;
    const configAxios = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${oauthToken}`,
      },
    };

    const response = this.httpService.get('https://api.iot.yandex.net/v1.0/user/info', configAxios);
    return response
      .toPromise()
      .then((res) => {
        return res?.data;
      })
      .catch((e) => {
        if (e.status == 401) {
          return new ForbiddenException('Oauth токен не валиден, попробуйте снова');
        }
      });
    //return response.subscribe(
    //  (res) => console.log(res),
    //  (err) => {
    //    console.log(err.status);
    //    return err.status;
    //  },
    //);
  }

  async getInfoDeviceById(deviceDto: number, accessToken: string) {
    const user = await this.checkOauthToken(accessToken);
    if (!user!.oauthToken) {
      return new ForbiddenException('Oauth токена нет');
    }
    const oauthToken = user?.oauthToken;
    const configAxios = {
      url: `https://api.iot.yandex.net/v1.0/devices/${deviceDto}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${oauthToken}`,
      },
    };
    const response = await this.httpService.request(configAxios);
  }

  async changeStateDevice(deviceDto: number, accessToken: string) {
    const user = await this.checkOauthToken(accessToken);
    if (!user!.oauthToken) {
      return new ForbiddenException('Oauth токена нет');
    }
    const oauthToken = user?.oauthToken;
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
