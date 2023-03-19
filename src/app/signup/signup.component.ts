import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{


  password: any;
  signup: FormGroup|any;
  signuser: any;


  email!: any;

  constructor(private http: HttpClient, private route: Router, private fb: FormBuilder){}
  ngOnInit(): void {
    this.signup = this.fb.group({
      name: [''],
      userName: [''],
      password: [''],
      confirmPassword:[''],
      email: [''],
      phoneNumber: [''],
    })

  }


  signupdata(signup: FormGroup){

    this.http.post<any>("https://webhotel.azurewebsites.net/api/Authorization/Registration", this.signup.value)
    .subscribe(res =>{
      this.signup.reset();
      alert("Create an account successfully!");
      this.route.navigate(['login'])
    },_err=>{
      alert('Something was wrong');
    })
  }
}
