import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/_service/storage.service';
import { User } from 'src/app/_service/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService, private jwtHelper: JwtHelperService, private toast: NgToastService) { }


  email: any;
  jwtService: JwtHelperService = new JwtHelperService();
  userProfile = new BehaviorSubject<User | null>(null);
  
}

