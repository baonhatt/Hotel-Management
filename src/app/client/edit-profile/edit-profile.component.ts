import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment.development';
import { FormControl } from '@angular/forms';
import { userProfile } from 'src/app/models/userProfile.model';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  updateProfile!: FormGroup;
  loading = false;
  submitted = false;
  userProfile = new userProfile;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: Router,
    private toast: NgToastService,
    private userInfo: ProfileComponent,
    private userService: UserService,
  ){}
  get f() {
    return this.updateProfile.controls
  }
  ngOnInit(): void {
    this.updateProfile = this.fb.group({
      phoneNumber:['', Validators.required, Validators.pattern("[0-9 ]{12}")],
      cmnd: ['',Validators.required, Validators.pattern("[0-9]{10}")],
      image: [null],
      address: ['', Validators.required, Validators.maxLength(100)]
    });
    this.getUserProfile();

  }
  getUserProfile() : void{
    this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
    })
  }

  updateUserProfile(updateProfile: FormGroup){
    this.http.post<any>(environment.BASE_URL_API + `/user/user-profile/update`, updateProfile.value )
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
