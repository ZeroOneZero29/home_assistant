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

  ngOnChanges() {
    console.log(this.devices);
  }

  lg() {
    console.log('dada test');
  }
}
