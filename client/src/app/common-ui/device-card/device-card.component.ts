import { Component, Input } from '@angular/core';
import { AllDevice, Device, Rooms } from '../../data/interface/device.interface';
import { ImgDevicePipe } from '../../helpers/img-device.pipe';

@Component({
  selector: 'app-device-card',
  imports: [ImgDevicePipe],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.scss',
})
export class DeviceCardComponent {
  @Input() devices!: Device;
  @Input() rooms!: Rooms[];
  nameRoomDevice: string = '';
  ngOnChanges() {
    this.nameRoomDevice = this.rooms
      .filter((el) => el.id === this.devices.room)
      .map((el) => el.name)
      .toString();
  }
}
