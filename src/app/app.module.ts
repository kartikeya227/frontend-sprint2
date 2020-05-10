import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { SignupSuccessComponent } from './signup/signup-success/signup-success.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import {UserService} from './Service/user.service';
import {GlobalService} from './Service/global.service';
import { AdminPanelLandingComponent } from './admin-panel/admin-panel-landing/admin-panel-landing.component';
import { UserPanelLandingComponent } from './user-panel/user-panel-landing/user-panel-landing.component';
import { AdminBookingsComponent } from './admin-panel/admin-bookings/admin-bookings.component';
import { UserMakeBookingComponent } from './user-panel/user-make-booking/user-make-booking.component';
import {BookingsService} from './Service/bookings.service';
import {ScheduledFlightService} from './Service/scheduled-flight.service';
import { ConfirmBookingComponent } from './user-panel/user-make-booking/confirm-booking/confirm-booking.component';
import {FlightsService} from './Service/flights.service';
import { AdminAccountComponent } from './admin-panel/admin-account/admin-account.component';
import { UserAccountComponent } from './user-panel/user-account/user-account.component';
import { UserBookingsComponent } from './user-panel/user-bookings/user-bookings.component';
import { AdminAirportComponent } from './admin-panel/admin-airport/admin-airport.component';
import {AirportsService} from './Service/airports.service';
import { AdminFlightsComponent } from './admin-panel/admin-flights/admin-flights.component';
import { AdminScheduledFlightComponent } from './admin-panel/admin-scheduled-flight/admin-scheduled-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    LandingComponent,
    SignupSuccessComponent,
    AdminPanelComponent,
    UserPanelComponent,
    AdminPanelLandingComponent,
    UserPanelLandingComponent,
    AdminBookingsComponent,
    UserMakeBookingComponent,
    ConfirmBookingComponent,
    AdminAccountComponent,
    UserAccountComponent,
    UserBookingsComponent,
    AdminAirportComponent,
    AdminFlightsComponent,
    AdminScheduledFlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AirportsService,
              BookingsService,
              FlightsService,
              ScheduledFlightService,
              UserService,
              GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
