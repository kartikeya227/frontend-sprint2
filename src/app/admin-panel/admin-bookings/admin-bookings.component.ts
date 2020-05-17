import {Component, OnInit} from '@angular/core';
import {Bookings} from '../../Model/bookings';
import {BookingsService} from '../../Service/bookings.service';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {

  bookings: Bookings[];
  displayDetails: boolean;
  currentBooking: Bookings;

  constructor(private  bookingsService: BookingsService) {
    this.currentBooking = new Bookings();
  }

  ngOnInit(): void {
    this.getBookings();
    this.displayDetails = false;
  }

  /**
   * Method to call service fetch all the booking from Database.
   */
  getBookings(): void {
    this.bookingsService.getBookings().subscribe(bookings => this.bookings = bookings);
  }

  /**
   * Method to Update DOM to show details of currently clicked booking by user.
   */
  getDetails(i: number): void {
    this.displayDetails = true;
    this.currentBooking = this.bookings[i];
  }

}
