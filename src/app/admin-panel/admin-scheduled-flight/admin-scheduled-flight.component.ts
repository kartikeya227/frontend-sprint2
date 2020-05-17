import {Component, OnInit} from '@angular/core';
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

  /**
   * Method to fetch flights from data base
   */
  getScheduledFlight(): void {
    this.scheduledFlightService.getScheduledFlight()
      .subscribe(schdeuledFlight => {
        this.scheduledFlights = schdeuledFlight;
        this.showScheduledFlights = true;
        this.showAdd = false;
        this.showUpdate = false;
        this.showDetails = false;
      });
  }

  /**
   * Method to set currently clicked flight in brouser memory
   */
  getCurrentScheduledFlight(i: number): void {
    this.currentScheduledFlight = this.scheduledFlights[i];
    this.showScheduledFlightDetails();

  }

  /**
   * Method to Update DOM with details currently clicked Scheduled flight.
   */
  showScheduledFlightDetails(): void {
    this.showAdd = false;
    this.showUpdate = false;
    this.showDetails = true;
  }

  /**
   * Method to set currently clicked arrival airport for form of adding new scheduled flight in brouser memory
   */
  getArrivalAirport(i: number): void {
    this.arrivalAirport = this.airports[i];
    this.arrivalAirportDisplay = this.arrivalAirport.airportLocation;
  }

  /**
   * Method to set currently clicked departure airport for form of adding new scheduled flight in brouser memory
   */
  getDepartureAirport(i: number): void {
    this.departureAirport = this.airports[i];
    this.destinationAirportDisplay = this.departureAirport.airportLocation;
  }

  /**
   * Method to set currently clicked flightt for form of adding new scheduled flight in brouser memory
   */
  getFlight(i: number): void {
    this.flight = this.flights[i];
    this.flightDisplay = this.flight.carrierName;
  }

  /**
   * Method to update DOM with Form to take input for new Scheduled flight addition.
   * gets the list of available airports and flight for user to choose from
   * sets a new blank scheduled flight oblect for user to fill it and send to database via scheduled flight service
   */
  showAddScheduledFlight(): void {
    this.airportsService.getAirports()
      .subscribe(airport => {
        this.airports = airport;
        this.flightsService.getFlights()
          .subscribe(flight => {
            this.flights = flight;
            this.currentScheduledFlight = new ScheduledFlight();
            this.currentScheduledFlight.schedule = new Schedule();
            this.arrivalAirportDisplay = 'Select Boarding Airport';
            this.destinationAirportDisplay = 'Select Landing Airport';
            this.flightDisplay = 'Select Flight';
            this.currentScheduledFlight.costPerTicket = 0.0;
            this.currentScheduledFlight.schedule.arrivalTime = '00:00:00';
            this.currentScheduledFlight.schedule.departureTime = '00:00:00';
            this.showAdd = true;
            this.showUpdate = false;
            this.showDetails = false;
          });
      });
  }

  /**
   * Method to call service to ass scheduled flight to data base.
   * also combines data from form and choosen airports and flight
   * into single object of scheduled flight to be sent to database via service
   */
  addScheduledFlight(): void {
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

  /**
   * Method to Update DOM for taking input for updating selected Scheduled flight.
   * fetches list of available airports and flight for user to update them
   */
  showUpdateScheduledFlight(): void {
    this.showAdd = false;
    this.showDetails = false;

    this.airportsService.getAirports()
      .subscribe(airport => {
        this.airports = airport;
        this.flightsService.getFlights()
          .subscribe(flight => {
            this.flights = flight;
            this.arrivalAirportDisplay = this.currentScheduledFlight.schedule.sourceAirport.airportLocation;
            this.destinationAirportDisplay = this.currentScheduledFlight.schedule.destinationAirport.airportLocation;
            this.flightDisplay = this.currentScheduledFlight.flight.carrierName;
            this.arrivalAirport = this.currentScheduledFlight.schedule.sourceAirport;
            this.departureAirport = this.currentScheduledFlight.schedule.destinationAirport;
            this.flight = this.currentScheduledFlight.flight;
            this.showAdd = false;
            this.showUpdate = true;
          });
      });

  }

  /**
   * Method to call service to update scheduled flight in database
   */
  updateScheduledFlight(): void {
    this.currentScheduledFlight.flight = this.flight;
    this.currentScheduledFlight.schedule.sourceAirport = this.arrivalAirport;
    this.currentScheduledFlight.schedule.destinationAirport = this.departureAirport;
    this.scheduledFlightService.updateScheduledFlight(this.currentScheduledFlight)
      .subscribe(value => {
        this.getScheduledFlight();
        this.showDetails = true;
      });
  }

  /**
   * Method to call service to delete scheduled flight in database
   */
  deleteScheduledFlight(): void {
    this.scheduledFlightService.deleteScheduledFlight(this.currentScheduledFlight.scheduleFlightId)
      .subscribe(value => {
        this.getScheduledFlight();
      });
  }

  ngOnInit(): void {
    this.getScheduledFlight();
  }

}
