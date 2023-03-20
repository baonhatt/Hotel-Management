import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,

} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenModel } from './token-model';

@Injectable()

export class AuthinterceptorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenModel = JSON.parse(token) as TokenModel;
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${tokenModel.accessToken}`)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
