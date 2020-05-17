import {Component, OnInit} from '@angular/core';
import {Flights} from '../../Model/flights';
import {FlightsService} from '../../Service/flights.service';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit {

  flights: Flights[];
  currentFlight: Flights;
  showFlights: boolean;
  showUpdate: boolean;
  showDetails: boolean;
  showAdd: boolean;

  constructor(private flightsService: FlightsService) {
    this.showFlights = false;
    this.showDetails = false;
    this.showUpdate = false;
    this.showAdd = false;
    this.currentFlight = new Flights();
    this.flights = new Array();
  }

  /**
   * Method to fetch all the flights from Database.
   */
  getFlights(): void {
    this.flightsService.getFlights()
      .subscribe(flights => {
        this.flights = flights;
        if (this.flights.length > 0) {
          this.showFlights = true;
          this.showDetails = false;
          this.showUpdate = false;
          this.showAdd = false;
        }
      });
  }

  /**
   * Method to Update DOM with the details of currently clicked flight.
   */
  showFlightDetails(i: number) {
    this.currentFlight = this.flights[i];
    this.showDetails = true;
    this.showUpdate = false;
    this.showAdd = false;
  }

  /**
   * Method to call service for deleting the current selected flight from the database.
   */
  deleteFlight(): void {
    this.flightsService.deleteFlight(this.currentFlight.flightNumber)
      .subscribe(value => {
        this.getFlights();
      });
  }

  /**
   * Method to update DOM with the form to take input for adding new flight.
   */
  showAddFlight(): void {
    this.showAdd = true;
    this.showDetails = false;
    this.showUpdate = false;
    this.currentFlight = new Flights();
  }

  /**
   * Method to call service for adding new flight to database
   */
  addFlight(): void {
    this.showDetails = false;
    this.showUpdate = false;
    this.flightsService.addFlight(this.currentFlight)
      .subscribe(value => {
        this.getFlights();
      });
  }

  /**
   * Method to update DOM with the form to take input for updating flight.
   */
  showUpdateFlight() {
    this.showUpdate = true;
    this.showDetails = false;
  }

  /**
   * Method to call service for updating flight in  database
   */
  updateFlight(): void {
    this.flightsService.updateFlight(this.currentFlight)
      .subscribe(value => {
        this.getFlights();
      });
  }


  ngOnInit(): void {
    this.getFlights();
  }

}
