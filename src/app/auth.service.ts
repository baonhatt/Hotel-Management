import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { TokenModel } from './token-model';
import { LoginComponent } from './login/login.component';
import { User } from './user/user';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) { }
  userProfile = new BehaviorSubject<User | null>(null);



  getAccessToken():string{
    var localStorageToken = localStorage.getItem('tokens');
    if(localStorageToken){
      var token = JSON.parse(localStorageToken) as TokenModel;
      var isTokenExpired = this.jwtService.isTokenExpired(token.access_token);
      if(isTokenExpired){
        this.userProfile.next(null);
        return "";
      }
      var userInfo = this.jwtService.decodeToken(
        token.access_token
      ) as User;
      this.userProfile.next(userInfo);
      return token.access_token;
    }
    return "";
  }

  login(email: string, password: string) {
    const body = {
      // userName: username,
      password: password,
      email: email
    };
    return this.http.post<any>('https://webhotel.azurewebsites.net/api/Authorization/Login',
    body).pipe(tap(response =>{
      var token = response as TokenModel;
      localStorage.setItem('token',JSON.stringify(token));
      var userInfo = this.jwtService.decodeToken(
        token.access_token
      ) as User;

      this.userProfile.next(userInfo);

      return true;
    }),
    catchError((error) => {
      console.log(error);
      return of(false);
    }))

  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      // Gửi yêu cầu đến API .NET để xác minh mã thông báo truy cập
      return true;
    } else {
      return false;
    }
  }
  refreshToken(login: TokenModel){
    return this.http.post<TokenModel>(
      'https://webhotel.azurewebsites.net/api/Token/Refresh',login
    );
  }
}
