import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';
import { Blog } from '../models/blog.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient ,private auth: AuthService) {}
  user: any;
  room: any;
  blog: any;
  apiRoom = 'http://webhotel1-dev.eba-9v28ppea.ap-south-1.elasticbeanstalk.com/user/room/get-all';
  apiBlog = 'http://localhost:3000/blog';
  private baseUrl1 = 'http://webhotel1-dev.eba-9v28ppea.ap-south-1.elasticbeanstalk.com/user/room';
  getRooms() {
    return this.http.get<Room[]>(environment.BASE_URL_API + '/user/room/get-all');
  }
  getBlogs(){
    return this.http.get<Blog[]>(this.apiBlog);
  }


  getRoomDetail(id: string): Observable<Room>{
    const url = `${environment.BASE_URL_API}/user/room/get-by-id?id=${id}`;
    return this.http.get<Room>(url);
  }

  getBlogDetail(id: number): Observable<Blog>{
    return this.http.get<Blog>(`${this.apiBlog}/${id}`).pipe()
  }

  postRoom(_room: Room) {
    return this.http.post<Room>(environment.BASE_URL_API + '/user/room/get-by-id', _room);
  }

  deleteRoom(id: string) {
    return this.http.delete(environment.BASE_URL_API + '/user/room/delete-by-id' + id);
  }
  searchRoom(query: string): Observable<any>{
    return this.http.get<Room[]>(`${environment.BASE_URL_API}/api/Room/getAllBy${query}`)
  }
  getUser() {
    this.user = this.auth.userProfile
    return this.user
  }
  getRoomDetail(id: any): Observable<Room> {
    return this.http.get<Room>(`${this.apiDetailUrl}${id}`);
  }
}
