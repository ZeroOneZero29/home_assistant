import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgRooms',
})
export class ImgRoomsPipe implements PipeTransform {
  transform(value: string): string {
    //@ts-ignore
    return this.roomImgObj.get(value);
  }

  roomImgObj = new Map([
    ['Кухня', 'kitchen'],
    ['Столовая ', 'kitchen'],
    ['Спальня', 'bedroom'],
    ['Балкон', 'balcony'],
    ['Ванная', 'bathroom'],
    ['Ванная комната', 'bathroom'],
    ['Зал', 'livingroom'],
    ['Гостинная', 'livingroom'],
    ['Коридор', 'corridor'],
    ['Холл', 'corridor'],
    ['Прихожая', 'corridor'],
    ['Туалет', 'washroom'],
    ['Все', 'alldevice'],
  ]);
}
