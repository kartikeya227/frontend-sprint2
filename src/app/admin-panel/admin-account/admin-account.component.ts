import {Component, OnInit} from '@angular/core';
import {Users} from '../../Model/users';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../Service/user.service';
import {GlobalService} from '../../Service/global.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {
  userDetails: Users;
  showUpdate: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private globalService: GlobalService) {
    this.userDetails = new Users();

  }

  /**
   * Method to call service for deleting the current user
   * navigates to home page when user is deleted*/
  deleteAccount(): void {
    this.userService.deleteUser(this.userDetails.userId).subscribe(value2 => {
      this.userDetails = new Users();
      this.globalService.setCurrentUser(new Users());
      this.globalService.loginStatus = false;
      this.router.navigate(['']);
    });
  }

  /**
   * Method to Update DOM with Update user comonents
   */
  updateAccount(): void {
    this.showUpdate = true;
  }

  /**
   * Method to call service for update the current user
   */
  confirmUpdateAccount(): void {
    this.userService.updateUser(this.userDetails).subscribe(user => {
      this.globalService.setCurrentUser(user);
      this.showUpdate = false;
    });
  }


  ngOnInit(): void {
    this.userDetails = this.globalService.getCurrentUser();
    this.showUpdate = false;
  }

}
