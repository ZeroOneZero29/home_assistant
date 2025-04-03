import { Component, inject, Input, input } from '@angular/core';
import { AllDevice, Device } from '../../data/interface/device.interface';
import { DatePipe, JsonPipe } from '@angular/common';
import { SvgIconComponent } from '../../helpers/svg-icon/svg-icon.component';
import { DeviceService } from '../../data/service/device.service';
import { concatMap, filter, from, map, mapTo, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-header-device',
  imports: [DatePipe, SvgIconComponent],
  templateUrl: './header-device.component.html',
  styleUrl: './header-device.component.scss',
})
export class HeaderDeviceComponent {
  now: Date = new Date();

  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  @Input() device!: Device[] | null;
  deviceService: DeviceService = inject(DeviceService);
  himidity: number | null = null;
  temperature: string | null = null;
  ngOnChanges() {
    const himidityArr = this.device!.filter((e) => e.type == 'devices.types.sensor.climate');
    const himidityT = himidityArr[0].properties.filter((e) => e.state.instance == 'humidity');
    this.himidity = Math.round(himidityT[0].state.value);
    const temperatureT = himidityArr[0].properties.filter((e) => e.state.instance == 'temperature');
    const temperatureStr = temperatureT[0].state.value;
    this.temperature = String(temperatureStr).replace('.', ',');
  }

  changeAllLight() {
    const stateDevice$ = this.deviceService
      .getAllDevice()
      .pipe(
        tap((e) => console.log(e)),
        map((e) => e.devices),
        map((e) => {
          let el: Device[] = e.filter(
            (e: Device) => e.type === 'devices.types.socket' || e.type === 'devices.types.light',
          );
          let off: Device[] = el.filter((e: Device) => e.capabilities[0].state.value === true);
          return off.map((e) => e.id);
        }),
      )
      .subscribe((res: string[]) => {
        console.log(res);
        if (res.length > 0) {
          this.deviceService.changeAllLightDevice(res);
        }
      });
  }
}
