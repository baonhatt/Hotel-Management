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
import { AuthinterceptorInterceptor } from './authinterceptor.interceptor';
import { HeaderComponent } from './header/header.component';
import { RoomComponent } from './room/room.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    HeaderComponent,
    RoomComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide:JWT_OPTIONS,
        useFactory: jwtOptionFactor,
        deps:[AuthService]
      }
    })

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function jwtOptionFactor(auth:AuthService){
  return {
    tokenGetter:() => {
      return auth.getAccessToken();
    },
    allowedDomains:["https://webhotel.azurewebsites.net"],
    disallowedRoutes:[
      "https://webhotel.azurewebsites.net/api/Authorization/Login"
    ]
  }
}
