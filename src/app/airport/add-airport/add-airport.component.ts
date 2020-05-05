import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AirportService} from '../../Service/airport.service';
import {Airport} from '../../Model/airport';

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})
export class AddAirportComponent {

  airport: Airport;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private airportService: AirportService) {
    this.airport = new Airport();
  }

  onSubmit(){
    this.airportService.addAirport(this.airport).subscribe(result => this.gotoUserList());
  }

  gotoUserList(){
    this.router.navigate(['/allairports']);
  }
}
