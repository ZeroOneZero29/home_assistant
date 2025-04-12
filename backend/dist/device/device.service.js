"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
let DeviceService = class DeviceService {
    constructor(userService, httpService, configService, jwtService) {
        this.userService = userService;
        this.httpService = httpService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async checkOauthToken(accessToken) {
        const tokenDecode = this.jwtService.decode(accessToken);
        const email = tokenDecode.sub;
        const user = await this.userService.findByEmail(email);
        if (!user?.oauthToken) {
            throw new common_1.ForbiddenException('Токена нет');
        }
        return user.oauthToken;
    }
    async getInfoDevice(accessToken) {
        const oauthToken = await this.checkOauthToken(accessToken);
        console.log(oauthToken);
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
                throw new common_1.ForbiddenException('Токен не валиден');
            }
        });
    }
    async getInfoDeviceById(deviceDto, accessToken) {
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
                throw new common_1.ForbiddenException('Токен не валиден');
            }
        });
    }
    async changeStateDevice(deviceDto, accessToken) {
        const oauthToken = await this.checkOauthToken(accessToken);
        const idDevice = deviceDto;
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
                    id: `${deviceDto}`,
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
        console.log(dataChangeStateDevice);
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
    async changeLigthDevice(accessToken, idDevice) {
        const oauthToken = await this.checkOauthToken(accessToken);
        let deviceAll = [];
        idDevice.forEach((idDevice) => {
            let template = {
                id: idDevice,
                actions: [
                    {
                        type: 'devices.capabilities.on_off',
                        state: {
                            instance: 'on',
                            value: false,
                        },
                    },
                ],
            };
            deviceAll.push(template);
        });
        let addName = {
            devices: deviceAll,
        };
        const dataId = JSON.stringify(addName);
        const configAxiosChangeStateDevice = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.iot.yandex.net/v1.0/devices/actions',
            headers: {
                Authorization: `Bearer ${oauthToken}`,
                'Content-Type': 'application/json',
            },
            data: dataId,
        };
        const changeStateDeviceRequst = await this.httpService
            .request(configAxiosChangeStateDevice)
            .subscribe((res) => {
            console.log(res);
        });
    }
};
exports.DeviceService = DeviceService;
exports.DeviceService = DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        axios_1.HttpService,
        config_1.ConfigService,
        jwt_1.JwtService])
], DeviceService);
//# sourceMappingURL=device.service.js.map