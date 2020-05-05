import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from '../Service/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  loginStatus = this.globalService.getLoginStatus();
  constructor( protected globalService: GlobalService) {
  }

  changeLoginState(){
    this.globalService.setLoginStatus();
    this.loginStatus = this.globalService.getLoginStatus();
  }
  ngOnInit(): void {
  }

}
