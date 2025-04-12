import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
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
    console.log(this.deviceFilterData);
  }

  deviceFilterData: Device[] | null = null;
  testOutId(idRoom: string) {
    this.deviceFilterData = this.deviceData!.filter((el) => el.room === idRoom);
  }
}
