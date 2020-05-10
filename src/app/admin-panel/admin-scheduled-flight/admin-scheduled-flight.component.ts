import { Component, OnInit } from '@angular/core';
import {ScheduledFlight} from '../../Model/scheduled-flight';
import {ScheduledFlightService} from '../../Service/scheduled-flight.service';
import {Airport} from '../../Model/airport';
import {Flights} from '../../Model/flights';
import {AirportsService} from '../../Service/airports.service';
import {FlightsService} from '../../Service/flights.service';
import {Schedule} from '../../Model/schedule';

@Component({
  selector: 'app-admin-scheduled-flight',
  templateUrl: './admin-scheduled-flight.component.html',
  styleUrls: ['./admin-scheduled-flight.component.css']
})
export class AdminScheduledFlightComponent implements OnInit {

  scheduledFlights: ScheduledFlight[];
  airports: Airport[];
  arrivalAirport: Airport;
  departureAirport: Airport;
  flights: Flights[];
  flight: Flights;
  currentScheduledFlight: ScheduledFlight;
  showScheduledFlights: boolean;
  showUpdate: boolean;
  showDetails: boolean;
  showAdd: boolean;
  d1: any;
  d2: any;
  arrivalAirportDisplay: string;
  destinationAirportDisplay: string;
  flightDisplay: string;
  constructor(private scheduledFlightService: ScheduledFlightService,
              private airportsService: AirportsService,
              private flightsService: FlightsService) {

    this.scheduledFlights = new Array();
    this.currentScheduledFlight = new ScheduledFlight();
    this.airports = new Array();
    this.arrivalAirport = new Airport();
    this.departureAirport = new Airport();
    this.flights = new Array();
    this.flight = new Flights();
    this.showScheduledFlights = false;
    this.showAdd = false;
    this.showUpdate = false;
    this.showDetails = false;
    this.arrivalAirportDisplay = 'Select Boarding Airport';
    this.destinationAirportDisplay = 'Select Landing Airport';
    this.flightDisplay = 'Select Flight';
  }

  getScheduledFlight(): void{
    this.scheduledFlightService.getScheduledFlight()
      .subscribe(schdeuledFlight => {
        this.scheduledFlights = schdeuledFlight;
        //this.currentScheduledFlight = this.scheduledFlights[0];
        this.showScheduledFlights = true;
        this.showAdd = false;
        this.showUpdate = false;
        this.showDetails = false;
      });
  }

  getCurrentScheduledFlight(i: number): void{
    this.currentScheduledFlight = this.scheduledFlights[i];
    this.showScheduledFlightDetails();
  }
  showScheduledFlightDetails(): void{
    this.showAdd = false;
    this.showUpdate = false;
    this.showDetails = true;
  }

  getArrivalAirport(i: number): void{
    this.arrivalAirport = this.airports[i];
    this.arrivalAirportDisplay = this.arrivalAirport.airportLocation;
  }
  getDepartureAirport(i: number): void{
    this.departureAirport = this.airports[i];
    this.destinationAirportDisplay = this.departureAirport.airportLocation;
  }
  getFlight(i: number): void{
    this.flight = this.flights[i];
    this.flightDisplay = this.flight.carrierName;
  }
  showAddScheduledFlight(): void{
    this.airportsService.getAirports()
      .subscribe(airport => {
        this.airports = airport;
        this.flightsService.getFlights()
          .subscribe(flight => {
            this.flights = flight;
            // this.currentScheduledFlight = new ScheduledFlight();
            // this.currentScheduledFlight = this.scheduledFlights[0];
            this.currentScheduledFlight = new ScheduledFlight();
            this.currentScheduledFlight.schedule = new Schedule();
            this.currentScheduledFlight.costPerTicket = 0.0;
            this.currentScheduledFlight.schedule.arrivalTime = '00:00:00';
            this.currentScheduledFlight.schedule.departureTime = '00:00:00';
            this.showAdd = true;
            this.showUpdate = false;
            this.showDetails = false;
          });
      });
  }

  addScheduledFlight(): void{
    this.currentScheduledFlight.availableSeats = this.flight.seatCapacity;
    this.currentScheduledFlight.schedule.sourceAirport = this.arrivalAirport;
    this.currentScheduledFlight.schedule.destinationAirport = this.departureAirport;
    this.currentScheduledFlight.flight = this.flight;
    this.currentScheduledFlight.schedule.arrivalDate = this.d1.toString();
    this.currentScheduledFlight.schedule.departureDate = this.d2.toString();

    this.scheduledFlightService.addScheduledFlight(this.currentScheduledFlight)
      .subscribe(value => {
        this.getScheduledFlight();
      });
  }
  showUpdateScheduledFlight(): void{
    this.showAdd = false;

    this.airportsService.getAirports()
      .subscribe(airport => {
        this.airports = airport;
        this.flightsService.getFlights()
          .subscribe(flight => {
            this.flights = flight;

            this.showAdd = false;
            this.showUpdate = true;
          });
      });

  }
  updateScheduledFlight(): void{
    this.currentScheduledFlight.flight = this.flight;
    this.currentScheduledFlight.schedule.sourceAirport = this.arrivalAirport;
    this.currentScheduledFlight.schedule.destinationAirport = this.departureAirport;
    this.scheduledFlightService.updateScheduledFlight(this.currentScheduledFlight)
      .subscribe(value => {
        this.getScheduledFlight();
        this.showDetails = true;
      });
  }
  deleteScheduledFlight(): void{
    this.scheduledFlightService.deleteScheduledFlight(this.currentScheduledFlight.scheduleFlightId)
      .subscribe(value => {
        this.getScheduledFlight();
      });
  }


  ngOnInit(): void {
    this.getScheduledFlight();
  }

}
