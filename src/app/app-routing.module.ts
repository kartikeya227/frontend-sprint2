import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AirportComponent} from './airport/airport.component';
import {AddAirportComponent} from './airport/add-airport/add-airport.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {SignupSuccessComponent} from './signup/signup-success/signup-success.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {AdminPanelLandingComponent} from './admin-panel/admin-panel-landing/admin-panel-landing.component';
import {UserPanelLandingComponent} from './user-panel/user-panel-landing/user-panel-landing.component';


const routes: Routes = [
  { path: 'allairports', component: AirportComponent},
  { path: 'addairport', component: AddAirportComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', component: LandingComponent},
  { path: 'signupsuccess', component: SignupSuccessComponent},
  { path: 'adminpanel', component: AdminPanelLandingComponent},
  { path: 'userpanel', component: UserPanelLandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
