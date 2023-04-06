import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment.development';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  updateProfile!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: Router,
    private toast: NgToastService
  ){}
  get f() {
    return this.updateProfile.controls
  }
  ngOnInit(): void {
    this.updateProfile = this.fb.group({
      email: [''],
      phoneNumber:['', Validators.required, Validators.pattern("[0-9 ]{12}")],
      cmnd: ['',Validators.required, Validators.pattern("[0-9]{10}")],
      image: [null],
      address: ['', Validators.required, Validators.maxLength(100)]
    })

  }

  updateUserProfile(updateProfile: FormGroup){
    this.http.post<any>(`https://localhost:7062/api/User/UpdateProfile`, updateProfile.value )
    .subscribe((res) =>{
      console.log(res);
      this.toast.success({
        detail: "Update Successfuly!"
      });
    }, err => {
      this.toast.error({
        detail: "Something was wrong!"
      });
    });
  }

  OnSubmit(){
    this.loading = true;
    this.updateUserProfile(this.updateProfile);
  }
  // OnSubmit(){
  //   // this.submitted = true;
  //   // if (this.updateProfile.invalid) {
  //   //   return;
  //   // }

  //   this.loading = true;
  //   this.updateUserProfile(this.updateProfile)
  // }
}
