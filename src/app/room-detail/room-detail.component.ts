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
  roomId!: any;

  imageUrl: string = '';
  roomdetail:undefined | Room;
  constructor(private route: ActivatedRoute, private apiService: ApiService){}

  ngOnInit() {

    this.getRoomDetail();
  }
  getRoomDetail(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getRoomDetail(id)
      .subscribe((res)=>{
        this.roomdetail = res
      })
  }


}

