import { Component, OnInit } from '@angular/core';
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
  showAdd: boolean
  constructor(private flightsService: FlightsService) {
    this.showFlights = false;
    this.showDetails = false;
    this.showUpdate = false;
    this.showAdd = false;
    this.currentFlight = new Flights();
    this.flights = new Array();
  }

  getFlights(): void{
    this.flightsService.getFlights()
      .subscribe(flights =>{
        this.flights = flights;
        if(this.flights.length > 0){
          this.showFlights = true;
          this.showDetails = false;
          this.showUpdate = false;
          this.showAdd = false;
        }
      });
  }
  showFlightDetails(i: number){
    this.currentFlight = this.flights[i];
    this.showDetails = true;
    this.showUpdate = false;
    this.showAdd = false;
  }
  deleteFlight(): void{
    this.flightsService.deleteFlight(this.currentFlight.flightNumber)
      .subscribe(value => {
        this.getFlights();
      });
  }
  showAddFlight(): void{
    this.showAdd = true;
    this.showDetails = false;
    this.showUpdate = false;
    this.currentFlight = new Flights();
  }
  addFlight(): void{
    this.flightsService.addFlight(this.currentFlight)
      .subscribe(value => {
        this.getFlights();
      });
  }
  showUpdateFlight(){
    this.showUpdate = true;
  }
  updateFlight(): void{
    this.flightsService.updateFlight(this.currentFlight)
      .subscribe(value => {
        this.getFlights();
      });
  }


  ngOnInit(): void {
    this.getFlights();
  }

}
