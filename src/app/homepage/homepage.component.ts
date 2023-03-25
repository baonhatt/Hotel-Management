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
    window.addEventListener( "pageshow", function ( event ) {
      var historyTraversal = event.persisted ||
                             ( typeof window.performance != "undefined" &&
                                  window.performance.navigation.type === 2 );
      if ( historyTraversal ) {
        // Handle page restore.
        window.location.reload();
      }
    });
  }
  getData() {

    const headers = new HttpHeaders()

    this.http.get('https://webhotel.azurewebsites.net/WeatherForecast', { headers, responseType: 'text' }).subscribe(res => {
      console.log(res);
    });
  }

}
