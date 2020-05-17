import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../Service/global.service';
import {UserService} from '../../Service/user.service';
import {Users} from '../../Model/users';
import {Bookings} from '../../Model/bookings';
import {BookingsService} from '../../Service/bookings.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  userDetails: Users;
  showUpdate: boolean;
  bookings: Bookings[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private globalService: GlobalService,
              private bookingsService: BookingsService) {
    this.userDetails = new Users();
  }

  /**
   * Method to delete the user from database.
   * also finds the booking made by the current user and deletes them as user is sub entity of booking in database.
   * warning prone to transactional error -  update required.
   * [ example updating scheduledflight.available seats at time of booking]
   */
  deleteAccount(): void {
    this.bookings = new Array();
    this.bookingsService.getBookingsByUserId(this.userDetails.userId)
      .subscribe(bookings => {
        this.bookings = bookings;
        const lenght = bookings.length;
        let i = 0;
        this.bookings.forEach(value => {
          this.bookingsService.deleteBookings(value.bookingId).subscribe(value1 => {
            i = i + 1;
            if (lenght == i) {
              this.userService.deleteUser(this.userDetails.userId).subscribe(value2 => {
                this.userDetails = new Users();
                this.globalService.setCurrentUser(new Users());
                this.router.navigate(['']);
              });
            }
          });
        });
      });
  }

  /**
   * Method to update DOM with form to get details to update account from user.
   */
  updateAccount(): void {
    this.showUpdate = true;
  }

  /**
   * Method to call service to update account in database
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
