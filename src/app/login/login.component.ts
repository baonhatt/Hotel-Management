import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, NgModel, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { catchError, map, Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { TokenModel } from '../shared/auth/token-model';
// import { AuthinterceptorInterceptor } from '../shared/auth/authinterceptor.interceptor';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  req: HttpRequest<any> | undefined

  email: any;
  password: any;
  loginForm!: FormGroup;
  data: any;
  userProfile: any;
  get f(){
    return this.loginForm.controls
  }
  constructor(private auth: AuthService, private fb: FormBuilder, private route: Router, private apiServe: ApiserviceService) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  login() {

    const email = this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;
    this.auth.login(email, password).subscribe((response) => {
      if (response ) {
        var token = response as TokenModel
        localStorage.setItem("token",JSON.stringify(token));
        this.route.navigate(['page-user'],)
        alert("Login successful!")
        this.userProfile = this.auth.userProfile
        console.log(this.userProfile)
      } else {
        alert("Something was wrong!")
      }
    })
  }

}



