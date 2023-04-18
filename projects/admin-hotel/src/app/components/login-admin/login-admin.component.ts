import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  constructor(private router: Router, private auth: AuthService) {}

  login() {
    // authenticate user and redirect to home page
    this.router.navigate(['/home']);
  }
}
