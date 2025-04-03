import { Component, inject, Input } from '@angular/core';
import { AllDevice, Rooms } from '../../data/interface/device.interface';
import { DeviceService } from '../../data/service/device.service';

@Component({
  selector: 'app-room-card',
  imports: [],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  deviceService: DeviceService = inject(DeviceService);
  myRoom: Rooms[] | null = null;

  //ngOnInit() {
  //  this.deviceService.getAllDevice().subscribe((res: AllDevice) => {
  //    this.myRoom = res.rooms;
  //  });
  //}
}
