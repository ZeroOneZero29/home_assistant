import { Component, inject, Input, signal } from '@angular/core';
import { Device, Rooms } from '../../data/interface/device.interface';
import { ImgDevicePipe } from '../../helpers/img-device.pipe';
import { SvgIconComponent } from '../../helpers/svg-icon/svg-icon.component';
import { HttpClient } from '@angular/common/http';
import { ImgDeviceOffPipe } from '../../helpers/img-device-off.pipe';

@Component({
  selector: 'app-device-card',
  imports: [ImgDevicePipe, SvgIconComponent, ImgDeviceOffPipe],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.scss',
})
export class DeviceCardComponent {
  http: HttpClient = inject(HttpClient);
  @Input() devices!: Device;
  @Input() rooms!: Rooms[];
  @Input() roomId!: string;
  baseUrl: string = 'http://localhost:3000/api/device/action?id=';
  nameRoomDevice: string = '';
  isCurrentState = signal<boolean>(false);
  isOnOffActions = signal<boolean>(false);

  devicePipe = inject(ImgDevicePipe);
  deviceOffPipe = inject(ImgDeviceOffPipe);
  srcImgDevice: string = '';
  ngOnChanges() {
    this.nameRoomDevice = this.rooms
      .filter((el) => el.id === this.devices.room)
      .map((el) => el.name)
      .toString();
    const checkCapabilitiesDevice = this.devices.capabilities.filter(
      (el) => el.type == 'devices.capabilities.on_off',
    );
    console.log(checkCapabilitiesDevice);
    if (checkCapabilitiesDevice[0]?.state?.instance === 'on') {
      this.isOnOffActions.set(true);
      this.isCurrentState.set(checkCapabilitiesDevice[0].state.value);
    }
    if (this.isCurrentState()) {
      this.srcImgDevice = this.devicePipe.transform(this.devices.type);
    } else {
      this.srcImgDevice = this.deviceOffPipe.transform(this.devices.type);
    }
    if (!this.isCurrentState()) {
      this.srcImgDevice = this.devicePipe.transform(this.devices.type);
    }
  }

  changeImg() {
    setTimeout(() => {
      if (this.isCurrentState()) {
        this.srcImgDevice = this.devicePipe.transform(this.devices.type);
      } else {
        this.srcImgDevice = this.deviceOffPipe.transform(this.devices.type);
      }
    }, 200);
    console.log(this.srcImgDevice);
  }
  changeShadowDevice() {
    this.isCurrentState.set(this.devices?.capabilities[0]?.state?.value);
  }

  changeActionDevice() {
    const body = {
      instance: this.devices.capabilities[0].type,
      state: this.devices.capabilities[0].state.value,
    };
    this.http.post(`${this.baseUrl}${this.devices.id}`, body).subscribe((res) => console.log(res));
    this.devices.capabilities[0].state.value = !this.devices.capabilities[0].state.value;
  }
}
