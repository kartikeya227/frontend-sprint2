import { Component, OnInit } from '@angular/core';
import {ScheduledFlight} from '../../Model/scheduled-flight';
import {ScheduledFlightService} from '../../Service/scheduled-flight.service';
import {GlobalService} from '../../Service/global.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-make-booking',
  templateUrl: './user-make-booking.component.html',
  styleUrls: ['./user-make-booking.component.css']
})
export class UserMakeBookingComponent implements OnInit {

  scheduledFlights: ScheduledFlight[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private scheduledFlightService: ScheduledFlightService,
              private globalService: GlobalService) {}


  ngOnInit(): void {
    this.getScheduledFlight();
  }

  getScheduledFlight(): void {
    this.scheduledFlightService.getScheduledFlight().subscribe(scheduledFlights => this.scheduledFlights = scheduledFlights);
  }

  setCurrentScheduledFlight(scheduledFlight: ScheduledFlight): void{
    this.globalService.setScheduledFlight(scheduledFlight);
    this.router.navigate(['/userconfirmbooking']);
  }

}
