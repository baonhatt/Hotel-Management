import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../_service/api.service';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private auth: AuthService, private fb: FormBuilder, private apiServe: ApiService){}



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

}
