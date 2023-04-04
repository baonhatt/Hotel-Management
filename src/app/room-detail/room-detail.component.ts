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
 
  imageUrl: string = '';
  roomDetail = new Room;
  constructor(private route: ActivatedRoute, private apiService: ApiService){}

  ngOnInit(): void {

    this.getRoute(this.route.snapshot.params['id']);
  }
  getRoute(id : any) {
    this.apiService.getRoomDetail(id).subscribe((res:any)=>{
      this.roomDetail = res;
    });
  }

}

