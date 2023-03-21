import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  loading = false;
  submitted = false;
  password: any;
  signup!: FormGroup;
  signuser: any;
  userName!: string;
  email!: any;
  get f() {
    return this.signup.controls
  }
  constructor(private http: HttpClient, private route: Router, private fb: FormBuilder){}
  ngOnInit(): void {
    this.signup = this.fb.group({
      name: ['',Validators.required, Validators.name],
      email: ['', [Validators.required ,Validators.email]],
      userName: ['',Validators.required, Validators.name],
      phoneNumber:['', Validators.required, Validators.pattern(' /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/')],

      password: ['',Validators.required,Validators.minLength(6)],
      confirmPassword: ['',Validators.required, this.cfPass]
    })
  }

  signupdata(signup: FormGroup){

    this.http.post<any>("https://webhotel.azurewebsites.net/api/Authorization/Registration", this.signup.value)
    .subscribe(res =>{
      alert("Create an account successfully!");

      this.route.navigate(['login'])
    },_err=>{
      alert('Something was wrong');

    })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signup.invalid) {
        return ;
    }

    this.signupdata(this.signup)
  }
  cfPass(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = this.signup.controls[password];
      const matchingControl = this.signup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['confirmPassword']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
        return { confirmPassword: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
}
