import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { AuthService } from '../_service/auth.service'
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
  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }
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

    this.auth.forgotPassword(this.form.value)
      .subscribe((result_resetpasswordstatus) => {
        if (result_resetpasswordstatus.code == 200) {
          alert("ok")
        }
        else {
          alert("not ok")

        }
      },
        (err) => {
          console.log(err);
        })
  }
}
