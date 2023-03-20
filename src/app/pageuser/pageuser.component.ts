import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-pageuser',
  templateUrl: './pageuser.component.html',
  styleUrls: ['./pageuser.component.scss']
})
export class PageuserComponent {
  data: any;
  constructor(private auth: AuthService, private fb: FormBuilder, private route: Router, private apiServe: ApiserviceService) { }
  getData() {
    this.apiServe.getData().subscribe((data) => {
      this.data = data;
      console.log(data)
    });
  }

}
