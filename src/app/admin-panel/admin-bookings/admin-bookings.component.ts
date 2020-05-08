import { Component, OnInit } from '@angular/core';
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
  constructor( private  bookingsService: BookingsService) {
    this.currentBooking = new Bookings();
  }

  ngOnInit(): void {
    this.getBookings();
    this.displayDetails = false;
  }
  getBookings(): void {
    this.bookingsService.getBookings().subscribe(bookings => this.bookings = bookings);
  }
  getDetails(i: number): void{
    this.displayDetails = true;
    this.currentBooking = this.bookings[i];
  }

}
