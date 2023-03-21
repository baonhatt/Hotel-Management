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
import { AuthTokenInterceptor } from '../app/shared/auth/auth-token-interceptor';
import { HeaderComponent } from './header/header.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from '../app/shared/auth/auth.service';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './shared/auth/auth-guard';
import { PageuserComponent } from '../app/pageuser/pageuser.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    HeaderComponent,
    PageuserComponent,
    DashboardComponent,
    RoomDetailComponent,
    FooterComponent,


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
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true },[AuthGuard]
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
