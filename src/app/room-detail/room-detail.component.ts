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
  room: Room | undefined;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    



  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getRoomDetail(id);
    }
  }
  getRoomDetail(id: number): void {
    this.apiService.getRoomDetail(id).subscribe({
      next: room => this.room == room,
      error: err => this.errorMessage = err
    });
  }
}
export {Room};
