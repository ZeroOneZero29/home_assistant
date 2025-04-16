import { Component, ElementRef, inject, Input, signal } from '@angular/core';
import { AllDevice, Device, Rooms } from '../../data/interface/device.interface';
import { ImgDevicePipe } from '../../helpers/img-device.pipe';
import { SvgIconComponent } from '../../helpers/svg-icon/svg-icon.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-device-card',
  imports: [ImgDevicePipe, SvgIconComponent],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.scss',
})
export class DeviceCardComponent {
  elementRef: ElementRef = inject(ElementRef);

  http: HttpClient = inject(HttpClient);
  @Input() devices!: Device;
  @Input() rooms!: Rooms[];
  @Input() roomId!: string;
  baseUrl: string = 'http://localhost:3000/api/device/action?id=';
  nameRoomDevice: string = '';
  ngOnChanges() {
    this.nameRoomDevice = this.rooms
      .filter((el) => el.id === this.devices.room)
      .map((el) => el.name)
      .toString();
    const checkCapabilitiesDevice = this.devices.capabilities.filter(
      (el) => el.type == 'devices.capabilities.on_off',
    );
    if (checkCapabilitiesDevice[0]?.state.instance == 'on') {
      this.isOnOffActions.set(true);
    }
  }

  isOnOffActions = signal<boolean>(false);

  changeActionDevice() {
    return this.http.get(`${this.baseUrl}${this.devices.id}`).subscribe((res) => console.log(res));
  }
}
