import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  @Input() room!: Room;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();
  imageUrl: string = '';

  constructor() {
    this.room = {
      typeRoom: '',
      image: '',
      discription: '',
      status: 0,
      rating: '',
      discount: 0,
      price: 0,
    }



  }
  ngOnInit(): void {
  }

}
export {Room};
