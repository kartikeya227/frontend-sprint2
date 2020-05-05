import { Component, OnInit } from '@angular/core';
import {Users} from '../Model/users';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../Service/global.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

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
