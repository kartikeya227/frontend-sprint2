import { Component, OnInit } from '@angular/core';
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

  scheduledFlightsReady: boolean
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

  allScheduledFlights(): void{
    this.scheduledFlightsReady = false;
    this.showSelect = false;
    this.scheduledFlightService.getScheduledFlight()
      .subscribe(value => {
        this.scheduledFlights = value;
        this.scheduledFlightsReady = true;
      });
  }
  searchScheduledFlight(): void{
    this.scheduledFlightsReady = false;
    this.airportsService.getAirports().
    subscribe(value => {
      this.airports = value;
    });
    this.showSelect = true;
  }
  prepareSearch(): void{
    this.preparedSearch = true;
    this.arrivalDate = this.d1.toString();
    this.departureDate = this.d2.toString();
  }

  setSourceAirport(i: number): void{
    this.arrivalAirport = this.airports[i].airportCode;
  }
  setDestinationAirport(i: number): void{
    this.departureAirport = this.airports[i].airportCode;
  }

  searchFlights(): void{
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

  setCurrentScheduledFlight(scheduledFlight: ScheduledFlight): void{
    this.globalService.setScheduledFlight(scheduledFlight);
    this.router.navigate(['/userconfirmbooking']);
  }

}
