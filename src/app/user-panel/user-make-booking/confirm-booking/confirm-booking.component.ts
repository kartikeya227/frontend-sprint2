import { Component, OnInit } from '@angular/core';
import {Passengers} from '../../../Model/passengers';
import {FormGroup} from '@angular/forms';
import {Bookings} from '../../../Model/bookings';
import {GlobalService} from '../../../Service/global.service';
import {ScheduledFlight} from '../../../Model/scheduled-flight';
import {BookingsService} from '../../../Service/bookings.service';
import {ScheduledFlightService} from '../../../Service/scheduled-flight.service';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  passengers: Passengers[];
  passenger: Passengers;
  booking: Bookings;
  noOfPassengers: number;
  scheduledFlight: ScheduledFlight;
  addedBooking: Bookings;
  constructor( private globalService: GlobalService,
               private bookingsService: BookingsService,
               private scheduledFlightService:ScheduledFlightService) {
    this.passengers = new Array();
    this.passenger = new Passengers();
    this.booking = new Bookings();
    this.scheduledFlight = new ScheduledFlight();
    this.scheduledFlight = this.globalService.getScheduledFlight();
    this.addedBooking = new Bookings();
  }

  addPassengers(): void{
    this.noOfPassengers = this.passengers.push(this.passenger);
    this.passenger = new  Passengers();
}

  makeBooking(): void{
    this.booking.user = this.globalService.getCurrentUser();
    this.booking.passengerList = this.passengers;
    this.booking.noOfPassengers = this.passengers.length;
    this.booking.cost = this.scheduledFlight.costPerTicket * this.passengers.length;
    this.booking.scheduledFlight = this.scheduledFlight;
    this.scheduledFlight.availableSeats = this.scheduledFlight.availableSeats - this.passengers.length;
    if (this.scheduledFlight.availableSeats >= 0){
        this.scheduledFlightService.updateScheduledFlight(this.scheduledFlight)
          .subscribe(value => {
            this.bookingsService.addBooking(this.booking)
                  .subscribe(booking => {this.addedBooking = booking;
                                         alert('Booking Successfully made');
                  });
        });
    }
    else{
      alert('Booking not possible. Available seats less than number of required seats.');
    }

  }

  ngOnInit(): void {
  }

}
