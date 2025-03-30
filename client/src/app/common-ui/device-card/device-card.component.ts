import { Component, Input } from '@angular/core';
import { allDevice, Device } from '../../data/interface/device.interface';

@Component({
  selector: 'app-device-card',
  imports: [],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.scss',
})
export class DeviceCardComponent {
  @Input() device!: allDevice<Device>;
}
