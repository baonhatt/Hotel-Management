import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenModel } from './token-model';
import { User } from '../../user/user';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.url.indexOf('Login') > -1 || req.url.indexOf('Refresh') > -1) {
      return next.handle(req);
    }

    const localStorageTokens = localStorage.getItem('token');
    var token: TokenModel;
    if (localStorageTokens) {
      token = JSON.parse(localStorageTokens) as TokenModel;
      var isTokenExpired = this.jwtHelper.isTokenExpired(token?.accessToken);
      if (isTokenExpired) {
        // return this.authService.refreshToken(token)
        //   .pipe(
        //     tap((res:TokenModel) => {
        //       var token = JSON.parse(res) as TokenModel;
        //       localStorage.setItem('token', JSON.stringify(token));
        //       var userInfo = this.jwtHelper.decodeToken(
        //         token.accessToken
        //       ) as User;
        //       this.authService.userProfile.next(userInfo);
        //     })
        // );
      }
      const transformedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          `bearer ${token.accessToken}`
        ),
      });
      return next.handle(transformedReq);
    }
    this.router.navigate(['/login']);
    return throwError(() => 'Invalid call');
  }
}

