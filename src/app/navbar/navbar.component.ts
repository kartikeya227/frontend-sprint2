import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from '../Service/global.service';
import {Users} from '../Model/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  loginStatus: boolean;
  currentuser: Users;

  constructor(private globalService: GlobalService) {
    this.loginStatus = this.globalService.getLoginStatus();
  }

  changeLoginState(ls: boolean) {
    this.globalService.setLoginStatus(ls);
    this.loginStatus = this.globalService.getLoginStatus();
    alert('logout' + this.globalService.getLoginStatus());
  }

  ngOnInit(): void {
    this.loginStatus = this.globalService.getLoginStatus();
    this.currentuser = this.globalService.getCurrentUser();
  }

}
