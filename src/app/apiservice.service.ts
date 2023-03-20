import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string, email: string) {
    return this.http.post('login', { username, password, email });
  }

  getData() {
    return this.http.get('https://webhotel.azurewebsites.net/WeatherForecast',{responseType: 'text'});
  }

}
