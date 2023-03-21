import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  constructor(private http: HttpClient ,private auth: AuthService) {}

  user: any;

  getUser() {
    this.user = this.auth.userProfile
    return this.user
  }
}
