import {Users} from './users';
import {Passengers} from './passengers';
import {ScheduledFlight} from './scheduled-flight';

export class Bookings {
  bookingId: number;
  cost: number;
  noOfPassengers: number;
  user: Users;
  passengerList: Passengers[];
  scheduledFlight: ScheduledFlight;
}
