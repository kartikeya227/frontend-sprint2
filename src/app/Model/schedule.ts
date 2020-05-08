import {Airport} from './airport';

export class Schedule {
  scheduleId: number;
  sourceAirport: Airport;
  destinationAirport: Airport;
  arrivalDate: string;
  arrivalTime: string;
  departureDate: string;
  departureTime: string;
}
