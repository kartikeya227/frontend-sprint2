import { Component, OnInit } from '@angular/core';
import {Airport} from '../Model/airport';
import {AirportService} from '../Service/airport.service';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  airports: Airport[];
  counter: Number;
  constructor(private airportService: AirportService) {
  }

  ngOnInit() {
    this.airportService.findAllAirport().subscribe(data => {
      this.airports = data;
      this.counter = 1;
     });
  }
}
