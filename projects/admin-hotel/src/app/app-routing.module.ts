import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from './components/layoutpage/layoutpage.component';
import { BookingComponent } from './components/components/booking/booking.component';
import { CustomerComponent } from './components/components/customer/customer.component';
import { RoomComponent } from './components/components/room/room.component';
import { AddbookingComponent } from './components/addbooking/addbooking.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: LayoutpageComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'add-booking', component: AddbookingComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'login', component: LoginAdminComponent},
  {path: 'signup', component: SignupAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
