import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Users} from '../Model/users';
import {Bookings} from '../Model/bookings';
import {ScheduledFlight} from '../Model/scheduled-flight';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loginStatus = false;
  currentUser: Users;
  currentScheduledFlight: ScheduledFlight;
  constructor() {
    this.currentUser = new Users();
    this.currentScheduledFlight = new ScheduledFlight();
  }

  // Current user----------------------------------------------
  public setCurrentUser(user: Users){
    this.currentUser = user;
  }
  public getCurrentUser(): Users{
    return this.currentUser;
  }
  // Current User----------------------------------------------

  // Current User----------------------------------------------
  public setScheduledFlight(scheduledFlight: ScheduledFlight): void{
    this.currentScheduledFlight = scheduledFlight;
  }

  public getScheduledFlight(): ScheduledFlight{
    return this.currentScheduledFlight;
  }
  // Current User----------------------------------------------

  // Login Status----------------------------------------------
  public getLoginStatus(): boolean{
    return this.loginStatus;
  }
  public setLoginStatus(){
    this.loginStatus = !this.loginStatus;
  }
  //Login Status----------------------------------------------
}
