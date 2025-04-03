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
  stateDevice = null;
  himidity: number | null = null;
  temperature: string | null = null;
  ngOnChanges() {
    const himidityArr = this.device!.filter((e) => e.type == 'devices.types.sensor.climate');
    const himidityT = himidityArr[0].properties.filter((e) => e.state.instance == 'humidity');
    this.himidity = Math.round(himidityT[0].state.value);
    const temperatureT = himidityArr[0].properties.filter((e) => e.state.instance == 'temperature');
    const temperatureStr = temperatureT[0].state.value;
    this.temperature = String(temperatureStr).replace('.', ',');
    console.log(himidityArr);
  }

  changeAllLight() {
    let stateDevice$ = this.deviceService
      .getAllDevice()
      .pipe(
        //tap((x) => console.log(x)),
        map((e) => e.devices),

        //switchMap((values) => from(values)),
        //concatMap((value) => timer(10).pipe(mapTo(value))),
        map((res) => res.filter((res: Device) => res.type === 'devices.types.light')),

        tap((x) => console.log(x)),
        //map((e) => {
        //  console.log(e.type);
        //  return e.type;
        //}),
        //filter((el) => el.type === 'devices.types.light'),
        //tap((x) => console.log(x)),
      )
      .subscribe((res: Device[]) => {
        console.log(res);
      });

    const ligthDevice: string[] | undefined = this.device
      ?.filter(function (e) {
        return (
          e.type == 'devices.types.light' ||
          e.type == 'devices.types.light.ceiling' ||
          e.type == 'devices.types.light.light.lamp' ||
          e.type == 'devices.types.light.strip'
        );
      })
      .filter((e) => e.capabilities[0].state.value === true)
      .map((e) => e.id);

    console.log(ligthDevice);
  }
}
