import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../_service/api.service';
import { AuthService } from '../_service/auth.service';
import { UserService } from '../_service/user.service';
import { userProfile } from '../models/userProfile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  dataloading = false;
  pageSize = 10;
  paginationEnabled = false;
  open: boolean = false;
  myScriptElement!: HTMLScriptElement;
  constructor(private auth: AuthService, private fb: FormBuilder, private apiServe: ApiService){
    this.myScriptElement = document.createElement("script")
    this.myScriptElement.src = "src/assets/scripts.js";
    document.body.appendChild(this.myScriptElement);
  }
  ngOnInit(): void {
    notiPopup();

  }
  userProfile = new userProfile;
  constructor(private auth: AuthService, private fb: FormBuilder, private apiServe: ApiService, private userService: UserService){}

    this.getUserProfile()
  }

  getUserProfile() : any{
    this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
    })
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  getUser(){
    return this.apiServe.getUser()
  }
  getLoggedInUser() {
    return this.auth.getLoggedInUser();
  }

  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    localStorage.removeItem('token');
  }
  toggle() {

  }
}
