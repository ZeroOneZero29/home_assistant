import { Component, inject } from '@angular/core';
import { DeviceService } from '../../data/service/device.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AllDevice, Device } from '../../data/interface/device.interface';
@Component({
  selector: 'app-device-page',
  imports: [CommonModule],
  templateUrl: './device-page.component.html',
  styleUrl: './device-page.component.scss',
})
export class DevicePageComponent {
  deviceService = inject(DeviceService);

  //device$ = this.deviceService.getAllDevice();

  allDevice: AllDevice<Device> | null = null;
  ngOnInit() {
    this.deviceService.getAllDevice().subscribe((res) => {
      this.allDevice = res;
    });
  }
}
