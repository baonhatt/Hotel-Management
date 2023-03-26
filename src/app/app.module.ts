import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthTokenInterceptor } from './_helper/http.interceptor';
import { HeaderComponent } from './header/header.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
// import { CanActivate } from '@angular/router';
import { AuthGuard } from './_helper/http.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { FooterComponent } from './footer/footer.component';
import { StorageService } from './_service/storage.service';
import { EmailValidatorDirective } from './_shared/validator/email-validators.directive';
import {  ValidatorFn, AbstractControl } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './client/profile/profile.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    HeaderComponent,
    DashboardComponent,
    RoomDetailComponent,
    FooterComponent,
    PagenotfoundComponent,
    ProfileComponent,
    SpinnerComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    NgToastModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide:JWT_OPTIONS,
        useFactory: jwtOptionsFactor,
        deps:[StorageService]
      }
    })

  ],
  providers:
  [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    [AuthGuard],
    [
      {
        provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
      }
    ]
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

export function jwtOptionsFactor(storage:StorageService){
  return {
    tokenGetter:() => {
      return storage.getAccessToken();
    },
    allowedDomains:["webhotel.azurewebsites.net"],
    disallowedRoutes:[
      "metaron1997-001-site1.ftempurl.com/api/Authorization/Login",
      "metaron1997-001-site1.ftempurl.com/api/Token/Refresh"
    ],
    skipWhenExpired: false,
  }
}
