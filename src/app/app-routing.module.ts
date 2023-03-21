import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './shared/auth/auth-guard';
import { PageuserComponent } from './pageuser/pageuser.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomepageComponent,   },
  { path: 'page-user', component: PageuserComponent},
  { path: 'room-detail', component: RoomDetailComponent },
  // { path: '', component: HomepageComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
