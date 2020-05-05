import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirportComponent } from './airport/airport.component';
import {HttpClientModule} from '@angular/common/http';
import {AirportService} from './Service/airport.service';
import { AddAirportComponent } from './airport/add-airport/add-airport.component';
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

@NgModule({
  declarations: [
    AppComponent,
    AirportComponent,
    AddAirportComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    LandingComponent,
    SignupSuccessComponent,
    AdminPanelComponent,
    UserPanelComponent,
    AdminPanelLandingComponent,
    UserPanelLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AirportService,
              UserService,
              GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
