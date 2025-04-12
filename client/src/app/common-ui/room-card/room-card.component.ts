import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rooms } from '../../data/interface/device.interface';
import { ImgRoomsPipe } from '../../helpers/img-rooms.pipe';
import { SvgIconComponent } from '../../helpers/svg-icon/svg-icon.component';

@Component({
  selector: 'app-room-card',
  imports: [SvgIconComponent, ImgRoomsPipe],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  @Input() room!: Rooms;
  @Output() newRoomId = new EventEmitter<string>();

  returnIdRoom() {
    this.newRoomId.emit(this.room.id);
    console.log(this.room.id);
  }
}
