import {Component, OnInit, ViewChild} from '@angular/core';
import {Passengers} from '../../../Model/passengers';
import {Bookings} from '../../../Model/bookings';
import {GlobalService} from '../../../Service/global.service';
import {ScheduledFlight} from '../../../Model/scheduled-flight';
import {BookingsService} from '../../../Service/bookings.service';
import {ScheduledFlightService} from '../../../Service/scheduled-flight.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  @ViewChild('addPassengersForm') form: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService,
              private bookingsService: BookingsService,
              private scheduledFlightService: ScheduledFlightService) {
    this.passengers = new Array();
    this.passenger = new Passengers();
    this.booking = new Bookings();
    this.scheduledFlight = new ScheduledFlight();
    this.scheduledFlight = this.globalService.getScheduledFlight();
    this.addedBooking = new Bookings();
  }

  /**
   * Method to push the details of passengers being added by user in a list.
   * resets the form every time on submission
   */
  addPassengers(): void {
    this.noOfPassengers = this.passengers.push(this.passenger);
    this.passenger = new Passengers();
    this.form.reset();
  }

  /**
   * Method to make and add new booking by the curently logged in user in the database.
   * also checks if the selected flight schedule selected by the user has enough seats that is requred to be booked by user.
   * checks if lenght of passenger list is less or equal to the avalable seats in the selected flight schedule.
   */
  makeBooking(): void {
    this.booking.user = this.globalService.getCurrentUser();
    this.booking.passengerList = this.passengers;
    this.booking.noOfPassengers = this.passengers.length;
    this.booking.cost = this.scheduledFlight.costPerTicket * this.passengers.length;
    this.booking.scheduledFlight = this.scheduledFlight;
    if ((this.scheduledFlight.availableSeats - this.passengers.length) >= 0) {
      this.bookingsService.addBooking(this.booking)
        .subscribe(booking => {
          this.addedBooking = booking;
          this.router.navigate(['/userpanel/bookings']);
        });
    } else {
      alert('Booking not possible. Available seats less than number of required seats.');
    }

  }

  ngOnInit(): void {
  }

}
