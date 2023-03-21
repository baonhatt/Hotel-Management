import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { TokenModel } from '../auth/token-model';
import { LoginComponent } from '../../login/login.component'
import { User } from '../../user/user';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) { }
  userProfile = new BehaviorSubject<User | null>(null);


  getAccessToken(): string {
    var localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      var token = JSON.parse(localStorageToken) as TokenModel;
      var isTokenExpired = this.jwtService.isTokenExpired(token.accessToken);
      console.log("Hạn của token: " + isTokenExpired);
      if (isTokenExpired) {
        this.userProfile.next(null);
        return "";
      }
      var userInfo = this.jwtService.decodeToken(
        token.accessToken
      ) as User;
      this.userProfile.next(userInfo);
      return token.accessToken;
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
      body).pipe(tap(response => {
        var token = response as TokenModel;
        localStorage.setItem('token', JSON.stringify(token));
        var userInfo = this.jwtService.decodeToken(
          token.accessToken
        ) as User;

        this.userProfile.next(userInfo);

        return true;
      }),
        catchError((error) => {
          console.log(error);
          return of(false);
        }))

  }


  refreshToken(login: TokenModel) {
    return this.http.post<TokenModel>(
      'https://webhotel.azurewebsites.net/api/Token/Refresh', login
    );
  }



  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    // Kiểm tra xem có thông tin người dùng nào được lưu trữ trong localStorage hoặc sessionStorage hay không
    if (this.getLoggedInUser() == null)
      return false;
    return true;
  }

  getLoggedInUser(): any {
    // Lấy thông tin người dùng đã đăng nhập từ localStorage hoặc sessionStorage
    var token = localStorage.getItem("token");
    if (token) {
      var tokenModel = JSON.parse(token) as TokenModel;
      var userInfo = this.jwtService.decodeToken(
        tokenModel.accessToken
      ) as User;
      return userInfo.UserName;
    }
    return null;
  }
}
