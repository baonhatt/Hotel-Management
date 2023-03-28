import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {



  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {


  }
  getData() {

    const headers = new HttpHeaders()

    this.http.get('https://localhost:44380/api/WeatherForecast', { headers, responseType: 'text' }).subscribe(res => {
      console.log(res);
    });
  }

}
