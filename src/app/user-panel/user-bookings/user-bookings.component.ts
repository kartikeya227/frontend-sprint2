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
  getBookings(): void {
    this.bookingsService.getBookingsByUserId(this.globalService.getCurrentUser().userId).
    subscribe(bookings => {this.bookings = bookings;
                           this.displayList = true;
                           if (this.bookings.length > 0){
                                this.noBookings = false;
                           }
    });

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
    this.bookingsService.deleteBookings(this.currentBooking.bookingId).
    subscribe(value => {
      this.displayList = false;
      this.displayDetails = false;
      this.currentBooking = new Bookings();
      this.getBookings();
    });
  }
}
