import { Component, inject, Input } from '@angular/core';
import { AllDevice, Rooms } from '../../data/interface/device.interface';
import { DeviceService } from '../../data/service/device.service';
import { ImgRoomsPipe } from '../../helpers/img-rooms.pipe';
import { SvgIconComponent } from '../../helpers/svg-icon/svg-icon.component';

@Component({
  selector: 'app-room-card',
  imports: [SvgIconComponent, ImgRoomsPipe],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  deviceService: DeviceService = inject(DeviceService);
  @Input() room!: Rooms;

  //ngOnInit() {
  //  this.deviceService.getAllDevice().subscribe((res: AllDevice) => {
  //    this.myRoom = res.rooms;
  //  });
  //}
  ngOnChanges() {
    console.log(this.room);
  }
}
