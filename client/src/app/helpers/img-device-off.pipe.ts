import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgDeviceOff',
})
export class ImgDeviceOffPipe implements PipeTransform {
  transform(value: string): string {
    //@ts-ignore
    return this.deviceImgObjOf.get(value);
  }

  deviceImgObjOf = new Map([
    ['devices.types.light', '/assets/img/devices/lamp/light-off.png'],
    ['devices.types.media_device.tv', '/assets/img/devices/media-device/media-device-tv-off.png'],
    ['devices.types.socket', '/assets/img/devices/socket/socket-off.png'],
  ]);
}
