import { Component, Input, input } from '@angular/core';
import { AllDevice, Device } from '../../data/interface/device.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-header-device',
  imports: [],
  templateUrl: './header-device.component.html',
  styleUrl: './header-device.component.scss',
})
export class HeaderDeviceComponent {
  @Input() device!: Device[] | null;
}
