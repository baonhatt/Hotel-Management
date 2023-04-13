import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from './components/layoutpage/layoutpage.component';
import { WrapcontentComponent } from './components/wrapcontent/wrapcontent.component';
import { BookingComponent } from './components/components/booking/booking.component';
import { CustomerComponent } from './components/components/customer/customer.component';
import { RoomComponent } from './components/components/room/room.component';
import { AddbookingComponent } from './components/addbooking/addbooking.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: LayoutpageComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'add-booking', component: AddbookingComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'room', component: RoomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
