import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '../../data/service/device.service';
import { AllDevice, Device, Rooms } from '../../data/interface/device.interface';
import { HeaderDeviceComponent } from '../header-device/header-device.component';
import { RoomCardComponent } from '../room-card/room-card.component';
import { SwiperOptions } from 'swiper/types';
import { DeviceCardComponent } from '../device-card/device-card.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderDeviceComponent, RoomCardComponent, DeviceCardComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutComponent {
  deviceService = inject(DeviceService);
  devicesHeader: Device[] | null = null;
  deviceData: Device[] | null = null;
  rooms!: Rooms[];
  ngOnInit() {
    this.deviceService.getAllDevice().subscribe((res: AllDevice) => {
      this.devicesHeader = res.devices;
      this.deviceData = res.devices;
      this.deviceFilterData = res.devices;
      console.log(this.devicesHeader);
      let j: Rooms[] = [{ id: 'all', name: 'Все', devices: [''] }];
      this.rooms = j.concat(res.rooms).filter((el) => el.devices.length > 0);
    });
    //console.log(this.rooms);

    const swiperEl = document.querySelector('swiper-container')!;
    const swiperParams: SwiperOptions = {
      slidesPerView: 3,
      spaceBetween: 80,
      breakpoints: {
        640: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      },
      loop: false,

      on: {
        init() {
          // ...
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams);

    // and now initialize it
    swiperEl.initialize();
    console.log(this.deviceFilterData);
  }
  roomId = '';
  deviceStatusRender = signal<boolean>(false);
  deviceFilterData: Device[] | null = null;
  testOutId(idRoom: string) {
    this.roomId = idRoom;
    let arrayDeviceCards = <HTMLCollection>document.getElementsByClassName('app-device-card');
    let arrayRooms = <HTMLCollection>document.getElementsByTagName('app-room-card');
    console.log(arrayRooms);
    for (let room of arrayRooms) {
      const idInElement = room.getAttribute('id');
      console.log(idInElement, room);
      if (idInElement === idRoom) {
        //@ts-ignore
        room.children[0].style = 'background-color:red ';
      }
    }
    for (let item of arrayDeviceCards) {
      const idInElement = item.getAttribute('id');
      if (idInElement === idRoom) {
        //@ts-ignore
        item.style = 'display : block';
      } else if (idRoom === 'all') {
        //@ts-ignore
        item.style = 'display : block';
      } else {
        //@ts-ignore
        item.style = 'display : none';
      }
    }
  }
}
