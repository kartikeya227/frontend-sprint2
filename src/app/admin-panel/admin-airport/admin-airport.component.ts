import {Component, OnInit} from '@angular/core';
import {Airport} from '../../Model/airport';
import {AirportsService} from '../../Service/airports.service';

@Component({
  selector: 'app-admin-airport',
  templateUrl: './admin-airport.component.html',
  styleUrls: ['./admin-airport.component.css']
})
export class AdminAirportComponent implements OnInit {
  airports: Airport[];
  currentAirport: Airport;
  showDetails: boolean;
  showUpdate: boolean;
  showAddAirport: boolean;

  constructor(private airportsService: AirportsService) {
    this.currentAirport = new Airport();
  }

  /**
   * Method to call service to fetch all airports.
   */
  getAirport(): void {
    this.airportsService.getAirports()
      .subscribe(value => {
        this.airports = value;
        this.showDetails = false;
        this.showUpdate = false;
        this.showAddAirport = false;
      });
  }

  /**
   * Method to set currently clicked airport by user.
   */
  getCurrentAirport(i: number): void {
    this.showAddAirport = false;
    this.showUpdate = false;
    this.currentAirport = this.airports[i];
    this.showDetails = true;
    this.showAddAirport = false;
  }

  /**
   * Method to Update DOM with form to add new airport
   */
  addAirportShow(): void {
    this.showAddAirport = true;
    this.showUpdate = false;
    this.showUpdate = false;
    this.currentAirport = new Airport();
    this.showDetails = false;
  }

  /**
   * Method to call service to update the new airport to DOM
   */
  addAirport(): void {
    this.showDetails = false;
    this.airportsService.addAirport(this.currentAirport)
      .subscribe(value => {
        this.showAddAirport = false;
        this.getAirport();
      });
  }

  /**
   * Method to call service To Delete Airport from Database
   */
  deleteAirport(): void {
    this.airportsService.deleteAirport(this.currentAirport.airportCode)
      .subscribe(value => {
        this.getAirport();
      });
  }

  /**
   * Method to Update DOM with form to take input for updating the airport
   */
  updateAirport(): void {
    this.showUpdate = true;
    this.showDetails = false;
    this.showAddAirport = false;
  }

  /**
   * Method to call service for updating the airport to database.
   */
  confirmUpdate(): void {
    this.airportsService.updateAirport(this.currentAirport)
      .subscribe(value => {
        this.showUpdate = false;
        this.getAirport();
      });
  }

  ngOnInit(): void {
    this.getAirport();
    this.showDetails = false;
    this.showUpdate = false;
    this.showAddAirport = false;
  }

}
