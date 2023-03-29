import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(private http: HttpClient, private toast: NgToastService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('firstLogin')==""){
      console.log(123);
      setTimeout(() => {
        this.toast.success({
          detail: 'Welcome you !',
          summary: "Đăng nhập thành công!",
          duration: 5000,
        });
        localStorage.removeItem("firstLogin");
      }, 500);
    }
  }
}
