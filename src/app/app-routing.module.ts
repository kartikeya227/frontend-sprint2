import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {SignupSuccessComponent} from './signup/signup-success/signup-success.component';
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
import {AuthgaurdAdminService} from './Service/authgaurd-admin.service';
import {AuthgaurdUserService} from './Service/authgaurd-user.service';

/**
 * Mapping of components with their respective routes.
 * to be used for router outlet.
 * Authgaurd applied to the secured routes, which can only be accessed by loged in User or Admin.
 */

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: LandingComponent},
  {path: 'signupsuccess', component: SignupSuccessComponent},
  {path: 'adminpanel', component: AdminPanelLandingComponent, canActivate: [AuthgaurdAdminService]},
  {path: 'userpanel', component: UserPanelLandingComponent, canActivate: [AuthgaurdUserService]},
  {path: 'adminpanel/bookings', component: AdminBookingsComponent, canActivate: [AuthgaurdAdminService]},
  {path: 'userpanel/makebookings', component: UserMakeBookingComponent, canActivate: [AuthgaurdUserService]},
  {path: 'userconfirmbooking', component: ConfirmBookingComponent, canActivate: [AuthgaurdUserService]},
  {path: 'userpanel/account', component: UserAccountComponent, canActivate: [AuthgaurdUserService]},
  {path: 'adminpanel/account', component: AdminAccountComponent, canActivate: [AuthgaurdAdminService]},
  {path: 'userpanel/bookings', component: UserBookingsComponent, canActivate: [AuthgaurdUserService]},
  {path: 'adminpanel/airports', component: AdminAirportComponent, canActivate: [AuthgaurdAdminService]},
  {path: 'adminpanel/flights', component: AdminFlightsComponent, canActivate: [AuthgaurdAdminService]},
  {path: 'adminpanel/scheduedflights', component: AdminScheduledFlightComponent, canActivate: [AuthgaurdAdminService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
