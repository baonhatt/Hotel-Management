import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  constructor(private http : HttpClient){}
  getData(){
    const headers = new HttpHeaders()
    this.http.get('https://webhotel.azurewebsites.net/WeatherForecast', { headers, responseType: 'text'}).subscribe(res => {
      console.log(res);
    });
  }
 
}
