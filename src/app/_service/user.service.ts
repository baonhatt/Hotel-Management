import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment.development';
import { userProfile } from '../models/user.model';

export interface UserData {
  items: User[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
};
@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(private http: HttpClient) { }



  getUserProfile(): Observable<userProfile> {
    return this.http.get<userProfile>(`${environment.BASE_URL_API}/user/user-profile/get`).pipe();
  }

}

