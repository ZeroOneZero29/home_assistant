import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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
  isEmpty = signal<boolean>(false);
  ngOnChanges() {
    if (this.room.devices.length > 0) {
      this.isEmpty.set(true);
    }
    this.initialBoxShadow();
  }
  returnIdRoom() {
    this.newRoomId.emit(this.room.id);
    console.log(this.room.id);
  }

  initialBoxShadow() {
    let arrayRoomsAll = <HTMLCollection>document.getElementsByTagName('app-room-card');
    for (let room of arrayRoomsAll) {
      const idInElementAll = room.getAttribute('id');
      if (idInElementAll === 'all') {
        //@ts-ignore
        room.children[0].firstElementChild.style =
          '-webkit-box-shadow: 0px 0px 8px 2px rgba(255, 177, 103, 1); -moz-box-shadow: 0px 0px 8px 2px rgba(255, 177, 103, 1); box-shadow: 0px 0px 8px 2px rgba(255, 177, 103, 1)';
      }
    }
  }
}
