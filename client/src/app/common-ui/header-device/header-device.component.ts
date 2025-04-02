import { Component, Input, input } from '@angular/core';
import { AllDevice, Device } from '../../data/interface/device.interface';
import { DatePipe, JsonPipe } from '@angular/common';
import { SvgIconComponent } from '../../helpers/svg-icon/svg-icon.component';

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

  Click() {
    console.log('da');
  }
}
