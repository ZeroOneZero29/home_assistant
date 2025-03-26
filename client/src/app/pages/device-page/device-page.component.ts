import { Component, inject } from '@angular/core';
import { DeviceService } from '../../data/service/device.service';

@Component({
  selector: 'app-device-page',
  imports: [],
  templateUrl: './device-page.component.html',
  styleUrl: './device-page.component.scss'
})
export class DevicePageComponent {
  deviceService = inject(DeviceService)

  ngOnInit() {
    this.deviceService.getAllDevice().subscribe(res => {
      console.log(res);
    })
  }
}
