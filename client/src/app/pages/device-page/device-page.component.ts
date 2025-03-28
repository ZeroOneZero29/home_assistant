import { Component, inject } from '@angular/core';
import { DeviceService } from '../../data/service/device.service';
import { AsyncPipe, CommonModule } from '@angular/common';
@Component({
  selector: 'app-device-page',
  imports: [CommonModule],
  templateUrl: './device-page.component.html',
  styleUrl: './device-page.component.scss',
})
export class DevicePageComponent {
  deviceService = inject(DeviceService);

  device$ = this.deviceService.getAllDevice();

  ngOnInit() {
    this.deviceService.getAllDevice().subscribe((res) => {
      console.log(res);
    });
  }
}
