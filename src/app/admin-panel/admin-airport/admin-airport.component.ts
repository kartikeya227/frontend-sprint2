import { Component, OnInit } from '@angular/core';
import {Airport} from '../../Model/airport';
import {AirportsService} from '../../Service/airports.service';
import {Users} from '../../Model/users';

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

  getAirport(): void{
    this.airportsService.getAirports()
      .subscribe(value => {this.airports = value;
                           this.showDetails = false;
                           this.showUpdate = false;
                           this.showAddAirport = false;
    });
  }

  getCurrentAirport(i: number): void{
    this.showAddAirport = false;
    this.showUpdate = false;
    this.currentAirport = this.airports[i];
    this.showDetails = true;
    this.showAddAirport = false;
  }
  addAirportShow(): void{
    this.showAddAirport = true;
    this.showUpdate = false;
    this.showUpdate = false;
    this.currentAirport = new Airport();
    this.showDetails = false;
  }
  addAirport(): void{
    this.showDetails = false;
    this.airportsService.addAirport(this.currentAirport)
      .subscribe(value => {
        this.showAddAirport = false;
        this.getAirport();
      });
  }
  deleteAirport(): void{
    this.airportsService.deleteAirport(this.currentAirport.airportCode)
      .subscribe(value => {
        this.getAirport();
      });
  }
  updateAirport(): void{
    this.showUpdate = true;
    this.showAddAirport = false;
  }
  confirmUpdate(): void{
    this.airportsService.updateAirport(this.currentAirport)
      .subscribe(value => {
        this.showUpdate = false;
        this.getAirport();
    });
  }

  ngOnInit(): void {
    this.getAirport();
  }

}
