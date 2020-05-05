import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Users} from '../Model/users';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loginStatus = false;
  currentUser: Users;
  constructor() {
    this.currentUser = new Users();
  }

  //Current user----------------------------------------------
  public setCurrentUser(user: Users){
    this.currentUser = user;
  }
  public getCurrentUser(): Users{
    return this.currentUser;
  }
  //Current User----------------------------------------------

  //Login Status----------------------------------------------
  public getLoginStatus(): boolean{
    return this.loginStatus;
  }
  public setLoginStatus(){
    this.loginStatus = !this.loginStatus;
  }
  //Login Status----------------------------------------------
}
