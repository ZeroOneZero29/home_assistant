import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '../../data/service/device.service';
import { AllDevice, Device } from '../../data/interface/device.interface';
import { HeaderDeviceComponent } from '../header-device/header-device.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderDeviceComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  deviceService = inject(DeviceService);
  device: Device[] | null = null;
  ngOnInit() {
    this.deviceService.getAllDevice().subscribe((res: AllDevice) => {
      this.device = res.devices;
    });
  }
}
