import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgDevice',
})
export class ImgDevicePipe implements PipeTransform {
  transform(value: string): string {
    //@ts-ignore
    return this.roomImgObj.get(value);
  }

  roomImgObj = new Map([['devices.types.light', 'access/img/devices/lamp/light']]);
}
