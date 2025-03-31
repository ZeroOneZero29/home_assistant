import { Component, inject } from '@angular/core';
import { DeviceService } from '../../data/service/device.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AllDevice, Device } from '../../data/interface/device.interface';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-device-page',
  imports: [CommonModule],
  templateUrl: './device-page.component.html',
  styleUrl: './device-page.component.scss',
})
export class DevicePageComponent {
  deviceService = inject(DeviceService);
  router = inject(Router);

  //device$ = this.deviceService.getAllDevice();

  allDevice: AllDevice | null = null;
  ngOnInit() {
    this.deviceService.getAllDevice().subscribe(
      (res) => {
        this.allDevice = res;
        console.log(res);
      },
      (error) => {
        if (error.status == 403) {
          this.router.navigate(['oauth']);
        }
      },
    );
  }

  onSubmit() {
    this.allDevice?.devices.forEach((e) => {
      if (e.type == 'devices.types.sensor.climate') {
        console.log(e);
      }
      console.log(e.type);
    });
    console.log(this.allDevice?.devices);
  }
}
