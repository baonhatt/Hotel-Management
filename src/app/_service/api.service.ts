import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient ,private auth: AuthService) {}

  user: any;

  getUser() {
    this.user = this.auth.userProfile
    return this.user
  }
}
