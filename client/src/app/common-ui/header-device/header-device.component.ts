import { Component, inject, Input, signal } from '@angular/core';
import { Device } from '../../data/interface/device.interface';
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../helpers/svg-icon/svg-icon.component';
import { DeviceService } from '../../data/service/device.service';
import { map } from 'rxjs';

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
    if (this.device) {
      const himidityArr = this.device!.filter((e) => e.type == 'devices.types.sensor.climate');
      const himidityT = himidityArr[0]?.properties.filter((e) => e.state.instance == 'humidity');
      this.himidity = Math.round(himidityT[0].state.value);
      const temperatureT = himidityArr[0]?.properties.filter(
        (e) => e.state.instance == 'temperature',
      );
      const temperatureStr = temperatureT[0].state.value;
      this.temperature = String(temperatureStr).replace('.', ',');
    }
  }

  changeAllLight() {
    const stateDevice$ = this.deviceService
      .getAllDevice()
      .pipe(
        map((e) => e.devices),
        map((e) => {
          let el: Device[] = e.filter(
            (e: Device) => e.type === 'devices.types.socket' || e.type === 'devices.types.light',
          );
          let off: Device[] = el.filter((e: Device) => e?.capabilities[0].state.value === true);
          return off.map((e) => e.id);
        }),
      )
      .subscribe((res: string[]) => {
        if (res.length > 0) {
          this.deviceService.changeAllLightDevice(res);
        }
      });
  }

  isStateToggle = signal<boolean>(true);
  toggleChangeStatus() {
    this.isStateToggle.set(false);

    setTimeout(() => {
      this.isStateToggle.set(true);
    }, 350);
  }
}
