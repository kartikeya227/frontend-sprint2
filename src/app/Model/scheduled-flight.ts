import {Flights} from './flights';
import {Schedule} from './schedule';

export class ScheduledFlight {
  scheduleFlightId: number;
  availableSeats: number;
  flight: Flights;
  schedule: Schedule;
  costPerTicket: number;
}
