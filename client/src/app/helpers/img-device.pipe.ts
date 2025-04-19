import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgDevice',
})
export class ImgDevicePipe implements PipeTransform {
  transform(value: string): string {
    //@ts-ignore
    return this.deviceImgObj.get(value);
  }

  deviceImgObj = new Map([
    ['devices.types.socket', '/assets/img/devices/socket/socket.png'],
    ['devices.types.light', '/assets/img/devices/lamp/light.png'],
    [
      'devices.types.media_device.tv',
      '/assets/img/devices/media-device-tv/media-device-tv-off.png',
    ],
    ['devices.types.sensor.climate', '/assets/img/devices/sensor-climate.png'],
  ]);
}
