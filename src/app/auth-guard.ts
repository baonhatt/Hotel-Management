
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    this.auth.getAccessToken();
    var user = this.auth.userProfile.getValue();

    if ((User?.sub ?? 0) ) {
      if (route.data['requiredAuth'] == false) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } else {
      if (route.data['requiredAuth'] == true) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
  }
}
