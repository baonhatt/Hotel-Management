import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { TokenModel } from './token.model';
import { LoginComponent } from '../login/login.component';
import { User } from './user.model';
import { StorageService } from './storage.service';

HttpClient;
const URL_BASE = 'https://webhotel.azurewebsites.net/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient, private storage: StorageService) {}
  userProfile = new BehaviorSubject<User | null>(null);

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<any>(URL_BASE + 'api/Authorization/Login', body).pipe(
      tap((response) => {
        let token = response as TokenModel;
        this.storage.setToken(token);
        var userInfo = this.jwtService.decodeToken(token.accessToken) as User;
        this.userProfile.next(userInfo);
        return true;
      }),
      catchError((error) => {
        alert(error);
        return of(false);
      }),
    );
  }

  refreshToken(login: TokenModel) {
    return this.http.post<TokenModel>(
      'https://webhotel.azurewebsites.net/api/Token/Refresh',
      login
    );
  }

  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Kiểm tra xem có thông tin người dùng nào được lưu trữ trong localStorage hoặc sessionStorage hay không
    if (this.getLoggedInUser() == null) return false;
    return true;
  }

  getLoggedInUser(): any {
    // Lấy thông tin người dùng đã đăng nhập từ localStorage hoặc sessionStorage
    var token = localStorage.getItem('token');
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