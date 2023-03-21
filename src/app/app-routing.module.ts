import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_helper/http.guard';
import { RoomDetailComponent } from './room-detail/room-detail.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    data : {
      requiredAuth:false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    data : {
      requiredAuth:false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomepageComponent,
    data : {
      requiredAuth:false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'room-detail',
    component: RoomDetailComponent,
    data : {
      requiredAuth:false
    },
    canActivate: [AuthGuard]
  },
  // { path: '', component: HomepageComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
