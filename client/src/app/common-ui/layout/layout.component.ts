import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '../../data/service/device.service';
import { AllDevice, Device, Rooms } from '../../data/interface/device.interface';
import { HeaderDeviceComponent } from '../header-device/header-device.component';
import { RoomCardComponent } from '../room-card/room-card.component';
import { flatMap, repeat } from 'rxjs';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderDeviceComponent, RoomCardComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutComponent {
  deviceService = inject(DeviceService);
  allDevices: Device[] | null = null;
  rooms: Rooms[] | null = null;
  ngOnInit() {
    this.deviceService.getAllDevice().subscribe((res: AllDevice) => {
      this.allDevices = res.devices;
      console.log(this.allDevices);
      const j = [{ id: '132', name: 'Гостинная', devices: ['122'] }];
      const r = [{ id: '1312', name: 'Гостинная', devices: ['122'] }];
      const p = [{ id: '1352', name: 'Гостинная', devices: ['122'] }];
      const c = [{ id: '1632', name: 'Гостинная', devices: ['122'] }];
      const od = [{ id: '17132', name: 'Гостинная', devices: ['122'] }];
      const of = [{ id: '17342', name: 'Гостинная', devices: ['122'] }];
      const ofg = [{ id: '17312', name: 'Гостинная', devices: ['122'] }];
      this.rooms = res.rooms.concat(j, p, r, c, od, of, ofg);
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
  }
}
