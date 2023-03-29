import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, first } from 'rxjs';
import {AuthService } from '../_service/auth.service'
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  form!: FormGroup;
    loading = false;
    submitted = false;
    email: any;
  constructor( private auth: AuthService,  private formBuilder: FormBuilder){}
  forgotPasswordForm!: FormGroup
  ngOnInit() {
    this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
    });
}

   // convenience getter for easy access to form fields



   get f() { return this.form.controls; }

   onSubmit() {
       this.submitted = true;

       // reset alerts on submit
      //  this.alertService.clear();

       // stop here if form is invalid
       if (this.form.invalid) {
           return;
       }

       this.loading = true;
      //  this.alertService.clear();
       this.auth.forgotPassword(this.f['email'].value)
           .pipe(first())
           .pipe(finalize(() => this.loading = false))
           .subscribe({
               next:() => alert("please check your email")
           });
   }
}
