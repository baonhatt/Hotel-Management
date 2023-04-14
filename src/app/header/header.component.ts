import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../_service/api.service';
import { AuthService } from '../_service/auth.service';
declare function notiPopup(): void
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  users = [];
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
