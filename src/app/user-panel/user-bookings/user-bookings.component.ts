import {Component, OnInit} from '@angular/core';
import {Bookings} from '../../Model/bookings';
import {BookingsService} from '../../Service/bookings.service';
import {GlobalService} from '../../Service/global.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  bookings: Bookings[];
  displayDetails: boolean;
  currentBooking: Bookings;
  showUpdate: boolean;
  displayList: boolean;
  noBookings: boolean;

  constructor(private  bookingsService: BookingsService,
              private globalService: GlobalService) {
    this.currentBooking = new Bookings();
    this.noBookings = true;
  }

  ngOnInit(): void {
    this.getBookings();
    this.displayDetails = false;
    this.showUpdate = false;
    this.displayList = true;
  }

  /**
   * Method to call service to fetch all booking made by the current loged in user from database.
   */
  getBookings(): void {
    this.bookingsService.getBookingsByUserId(this.globalService.getCurrentUser().userId).subscribe(bookings => {
      this.bookings = bookings;
      this.displayList = true;
      if (this.bookings.length > 0) {
        this.noBookings = false;
      }
    });

  }

  /**
   * Method to Update DOM with details of currently clicked booking.
   */
  getDetails(i: number): void {
    this.displayDetails = true;
    this.currentBooking = this.bookings[i];
  }

  /**
   * Method to Update DOM with form to get details of updated clicked booking.
   */
  updateDetails(): void {
    this.showUpdate = true;
    this.displayDetails = false;
  }

  /**
   * Method to call service to update the booking in database
   */
  ConfirmUpdateDetails(): void {
    this.bookingsService.updateBookings(this.currentBooking).subscribe();
    this.showUpdate = false;
    this.getBookings();
  }

  /**
   * Method to call service to delete the selected booking from database.
   */
  deleteBooking(): void {
    this.bookingsService.deleteBookings(this.currentBooking.bookingId).subscribe(value => {
      this.displayList = false;
      this.displayDetails = false;
      this.currentBooking = new Bookings();
      this.getBookings();
    });
  }
}
