import { Component, OnInit } from '@angular/core';
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
  constructor(private  bookingsService: BookingsService,
              private globalService: GlobalService) {
    this.currentBooking = new Bookings();
  }

  ngOnInit(): void {
    this.getBookings();
    this.displayDetails = false;
    this.showUpdate = false;
    this.displayList = true;
  }
  getBookings(): void {
    this.bookingsService.getBookingsByUserId(this.globalService.getCurrentUser().userId).
    subscribe(bookings => this.bookings = bookings);
  }
  getDetails(i: number): void{
    this.displayDetails = true;
    this.currentBooking = this.bookings[i];
  }
  updateDetails(): void{
    this.showUpdate = true;
  }
  ConfirmUpdateDetails(): void{
    this.bookingsService.updateBookings(this.currentBooking).
    subscribe();
    this.showUpdate = false;
    this.getBookings();
  }
  deleteBooking(): void{
    this.displayList = false;
    this.displayDetails = false;
    this.bookingsService.deleteBookings(this.currentBooking.bookingId).
    subscribe();
    this.currentBooking = new Bookings();
    this.getBookings();
    this.displayList = true;
  }
}
