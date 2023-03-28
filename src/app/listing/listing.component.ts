import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Room } from '../models/room.model';
import { ApiService } from '../_service/api.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  rooms: Room[];
  roomToDisplay: Room[];
  constructor( private roomService: ApiService){
   this.rooms = [],
   this.roomToDisplay = this.rooms
  }
  ngOnInit(): void {

    this.roomService.getRooms().subscribe((res)=>{
      for(let room of res){
        this.rooms.unshift(room);
      }
      this.roomToDisplay = this.rooms

  })
  }

}
