import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '../../data/service/device.service';
import { AllDevice, Device, Rooms } from '../../data/interface/device.interface';
import { HeaderDeviceComponent } from '../header-device/header-device.component';
import { RoomCardComponent } from '../room-card/room-card.component';

@Component({
  selector: 'app-layout',
  imports: [RoomCardComponent, RouterOutlet, HeaderDeviceComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  deviceService = inject(DeviceService);
  device: Device[] | null = null;
  rooms: Rooms[] | null = null;
  ngOnInit() {
    this.deviceService.getAllDevice().subscribe((res: AllDevice) => {
      this.device = res.devices;
      this.rooms = res.rooms;
      console.log(this.rooms);
    });
  }
}
