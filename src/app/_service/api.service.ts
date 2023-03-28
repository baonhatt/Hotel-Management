import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient ,private auth: AuthService) {}

  user: any;
  room: any;
  baseUrl = 'http://localhost:3000/rooms';



  getRooms() {
    return this.http.get<Room[]>(this.baseUrl);
  }

  postRoom(_room: Room) {
    return this.http.post<Room>(this.baseUrl, _room);
  }

  deleteRoom(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
  getUser() {
    this.user = this.auth.userProfile
    return this.user
  }
}
