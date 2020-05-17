import {Component, OnInit} from '@angular/core';
import {ScheduledFlight} from '../../Model/scheduled-flight';
import {ScheduledFlightService} from '../../Service/scheduled-flight.service';
import {GlobalService} from '../../Service/global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Airport} from '../../Model/airport';
import {AirportsService} from '../../Service/airports.service';
import {ScheduledFlightSearchByAirportDate} from '../../Model/scheduled-flight-search-by-airport-date';

@Component({
  selector: 'app-user-make-booking',
  templateUrl: './user-make-booking.component.html',
  styleUrls: ['./user-make-booking.component.css']
})
export class UserMakeBookingComponent implements OnInit {

  scheduledFlightsReady: boolean;
  showSelect: boolean;
  preparedSearch: boolean;
  scheduledFlights: ScheduledFlight[];
  airports: Airport[];
  arrivalAirport: string;
  departureAirport: string;
  arrivalDate: string;
  departureDate: string;
  d1: any;
  d2: any;
  arrivalAirportDisplay = 'Select Boarding Airport';
  destinationAirportDisplay = 'Select Landing Airport';
  scheduledFlightSearchByAirportDate: ScheduledFlightSearchByAirportDate;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private scheduledFlightService: ScheduledFlightService,
              private globalService: GlobalService,
              private airportsService: AirportsService) {
    this.airports = new Array();
  }


  ngOnInit(): void {
    this.scheduledFlightsReady = false;
    this.showSelect = false;
    this.preparedSearch = false;
  }

  /**
   * Method to call service to fetch all the flight schedule available.
   * for user to choose and make booking against the selected schedule.
   */
  allScheduledFlights(): void {
    this.scheduledFlightsReady = false;
    this.showSelect = false;
    this.scheduledFlightService.getScheduledFlight()
      .subscribe(value => {
        this.scheduledFlights = value;
        this.scheduledFlightsReady = true;
      });
  }

  /**
   * Method to Update DOM with form for user to prepare a search
   * search includes:
   * 1. Boarding airport.
   * 2. landing Airport.
   * 3. A time span [from date,to date]
   *
   */
  searchScheduledFlight(): void {
    this.scheduledFlightsReady = false;
    this.arrivalAirportDisplay = 'Select Boarding Airport';
    this.destinationAirportDisplay = 'Select Landing Airport';
    this.airportsService.getAirports().subscribe(value => {
      this.airports = value;
      this.showSelect = true;
    });

  }

  /**
   * Method to set arrival date and departure date in string type, from the calender input of form
   */
  prepareSearch(): void {
    this.preparedSearch = true;
    this.arrivalDate = this.d1.toString();
    this.departureDate = this.d2.toString();
  }

  /**
   * Method to set the arrival airport as per the airport clicked by user
   */
  setSourceAirport(i: number): void {
    this.arrivalAirport = this.airports[i].airportCode;
    this.arrivalAirportDisplay = this.arrivalAirport;
  }

  /**
   * Method to set the Destination airport as per the airport clicked by user
   */
  setDestinationAirport(i: number): void {
    this.departureAirport = this.airports[i].airportCode;
    this.destinationAirportDisplay = this.departureAirport;
  }

  /**
   * Method to call service to fetch scheduled fligths from the database matching the user choice.
   * Also update DOM with the new list of available schedule flights
   */
  searchFlights(): void {
    this.scheduledFlightService.getScheduledFlightByAirportDate(
      this.arrivalAirport,
      this.departureAirport,
      this.arrivalDate,
      this.departureDate).subscribe(value => {

      this.showSelect = false;
      this.preparedSearch = false;
      this.scheduledFlights = value;
      this.scheduledFlightsReady = true;
    });
  }

  /**
   * Method to set currently choosen scheduled flight by the user and set it as global variable.
   * this global variable will be later used in "confirm Booking" component.
   * navigates the Router to Confirm booking component.
   */
  setCurrentScheduledFlight(scheduledFlight: ScheduledFlight): void {
    this.globalService.setScheduledFlight(scheduledFlight);
    this.router.navigate(['/userconfirmbooking']);
  }

}
