import {Component, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {SignupSuccessComponent} from './signup/signup-success/signup-success.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {AdminPanelLandingComponent} from './admin-panel/admin-panel-landing/admin-panel-landing.component';
import {UserPanelLandingComponent} from './user-panel/user-panel-landing/user-panel-landing.component';
import {AdminBookingsComponent} from './admin-panel/admin-bookings/admin-bookings.component';
import {UserMakeBookingComponent} from './user-panel/user-make-booking/user-make-booking.component';
import {ConfirmBookingComponent} from './user-panel/user-make-booking/confirm-booking/confirm-booking.component';
import {AdminAccountComponent} from './admin-panel/admin-account/admin-account.component';
import {UserAccountComponent} from './user-panel/user-account/user-account.component';
import {UserBookingsComponent} from './user-panel/user-bookings/user-bookings.component';
import {AdminAirportComponent} from './admin-panel/admin-airport/admin-airport.component';
import {AdminFlightsComponent} from './admin-panel/admin-flights/admin-flights.component';
import {AdminScheduledFlightComponent} from './admin-panel/admin-scheduled-flight/admin-scheduled-flight.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', component: LandingComponent},
  { path: 'signupsuccess', component: SignupSuccessComponent},
  { path: 'adminpanel', component: AdminPanelLandingComponent},
  { path: 'userpanel', component: UserPanelLandingComponent},
  { path: 'adminpanel/bookings', component: AdminBookingsComponent},
  { path: 'userpanel/makebookings', component: UserMakeBookingComponent},
  { path: 'userconfirmbooking', component: ConfirmBookingComponent},
  { path: 'userpanel/account', component: UserAccountComponent},
  { path: 'adminpanel/account', component: AdminAccountComponent},
  { path: 'userpanel/bookings', component: UserBookingsComponent},
  { path: 'adminpanel/airports', component: AdminAirportComponent},
  { path: 'adminpanel/flights', component: AdminFlightsComponent},
  { path: 'adminpanel/scheduedflights', component: AdminScheduledFlightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
