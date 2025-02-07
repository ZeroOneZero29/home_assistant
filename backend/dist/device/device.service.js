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
let DeviceService = class DeviceService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
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
        console.log(response?.data);
        return response?.data;
    }
    async getInfoDeviceById(deviceDto) {
        const configAxios = {
            method: 'get',
            headers: {
                Authorization: this.configService.get('yandex'),
            },
        };
        const response = await this.httpService
            .get(`https://api.iot.yandex.net/v1.0/devices/${deviceDto}`, configAxios)
            .toPromise();
        return response?.data;
    }
    async changeStateDevice(deviceDto) {
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
};
exports.DeviceService = DeviceService;
exports.DeviceService = DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], DeviceService);
//# sourceMappingURL=device.service.js.map