import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { AuthService } from '../shared/auth/auth.service';
@Component({
  selector: 'app-pageuser',
  templateUrl: './pageuser.component.html',
  styleUrls: ['./pageuser.component.scss']
})

export class PageuserComponent {
 constructor(private http : HttpClient){}
  getData(){
    const headers = new HttpHeaders()
    this.http.get('https://webhotel.azurewebsites.net/WeatherForecast', { headers, responseType: 'text'}).subscribe(res => {
      console.log(res);
    });

  }

}
