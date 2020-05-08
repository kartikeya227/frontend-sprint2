import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScheduledFlightService} from '../../Service/scheduled-flight.service';
import {GlobalService} from '../../Service/global.service';
import {UserService} from '../../Service/user.service';
import {Users} from '../../Model/users';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  userDetails: Users;
  showUpdate: boolean;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private globalService: GlobalService) {
    this.userDetails = new Users();
  }

  deleteAccount(): void{
    this.userService.deleteUser(this.userDetails.userId).subscribe();
    this.globalService.setCurrentUser(new Users());
    this.router.navigate(['']);

  }
  updateAccount(): void{
    this.showUpdate = true;
  }
  confirmUpdateAccount(): void{
    this.userService.updateUser(this.userDetails).
    subscribe(user => this.globalService.setCurrentUser(user));
  }

  ngOnInit(): void {
    this.userDetails = this.globalService.getCurrentUser();
    this.showUpdate = false;
  }

}
