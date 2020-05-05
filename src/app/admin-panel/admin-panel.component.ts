import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../Service/global.service';
import {UserService} from '../Service/user.service';
import {Users} from '../Model/users';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  currentUser: Users;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService
  ) {
    this.currentUser = new Users();
    this.currentUser = this.globalService.getCurrentUser();
  }


  ngOnInit(): void {
  }

}
