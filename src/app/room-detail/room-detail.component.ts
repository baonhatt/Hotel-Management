import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  // @Input() room!: Room;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();
  imageUrl: string = '';
  errorMessage = '';

  roomToDisplay!: Room[];
  room!: Room[]
  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  this.roomToDisplay = this.room;



  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getRoomDetail(id).subscribe(room =>
      this.room)
  }

}
export {Room};
