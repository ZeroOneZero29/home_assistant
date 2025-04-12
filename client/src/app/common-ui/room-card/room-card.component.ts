import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  @Output() newRoomId = new EventEmitter<string>();
  //ngOnInit() {
  //  this.deviceService.getAllDevice().subscribe((res: AllDevice) => {
  //    this.myRoom = res.rooms;
  //  });
  //}

  returnIdRoom() {
    this.newRoomId.emit(this.room.id);
    console.log(this.room.id);
  }
}
