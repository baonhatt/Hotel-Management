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
  signupForm: FormGroup|any;
  signuser: any;
  signup: any;

  email!: any;

  constructor(private http: HttpClient, private route: Router, private fb: FormBuilder){}
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [''],
      userName: [''],
      password: [''],
      confirmPassword:[''],
      email: [''],
      phoneNumber: [''],
    })

  }


  signupdata(signupForm: FormGroup){

    this.http.post<any>("https://webhotel.azurewebsites.net/api/Authorization/Registration", this.signupForm.value)
    .subscribe(response =>{
      this.signup.reset();
      alert("Create an account successfully!");
      this.route.navigate(['login'])
    },_err=>{
      alert('Something was wrong');
    })
  }
}
