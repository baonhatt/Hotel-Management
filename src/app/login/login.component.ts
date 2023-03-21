import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, NgModel, Validators } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { catchError, map, Observable } from 'rxjs';
import { TokenModel } from '../_service/token.model';
// import { AuthinterceptorInterceptor } from '../shared/auth/authinterceptor.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  submitted = false;
  req: HttpRequest<any> | undefined
  email: any;
  password: any;
  loginForm!: FormGroup;
  data: any;
  userProfile: any;
  get f() {
    return this.loginForm.controls
  }
  constructor(private auth: AuthService, private fb: FormBuilder, private route: Router) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    })
  }

  login() {
    const email = this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;
    this.auth.login(email, password).subscribe((response) => {
      if (response ) {
        var token = response as TokenModel
        localStorage.setItem("token",JSON.stringify(token));
        this.route.navigate(['home'],)
        alert("Login successful!")
        this.userProfile = this.auth.userProfile
        console.log(this.userProfile)
      } else {
        alert("Something was wrong!")
      }
    })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return ;
    }

      this.login()
  }

}



