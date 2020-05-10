// scheduledFlightUrl = 'http://localhost:9090/scheduled/flight';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {ScheduledFlight} from '../Model/scheduled-flight';
import {ScheduledFlightSearchByAirportDate} from '../Model/scheduled-flight-search-by-airport-date';


@Injectable({ providedIn: 'root' })
export class ScheduledFlightService {

  private scheduledFlightUrl = 'http://localhost:9090/scheduled/flight';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET Scheduled Flights from the server */
  getScheduledFlight(): Observable<ScheduledFlight[]> {
    return this.http.get<ScheduledFlight[]>(this.scheduledFlightUrl)
      .pipe(
        tap(_ => this.log('Fetched Scheduled Fights')),
        catchError(this.handleError<ScheduledFlight[]>('getScheduledFlight', []))
      );
  }

  /** GET Scheduled Flights from the server by Airport And Date */

  getScheduledFlightByAirportDate(arivalAirport: string,
                                  departureAirport: string,
                                  arrivalDate: string,
                                  departureDate: string): Observable<ScheduledFlight[]> {
    const url = `${this.scheduledFlightUrl}/${arivalAirport}/${departureAirport}/${arrivalDate}/${departureDate}`;
    return this.http.get<ScheduledFlight[]>(url)
      .pipe(
        tap(_ => this.log('Fetched Scheduled Fights')),
        catchError(this.handleError<ScheduledFlight[]>('getScheduledFlightByAirportDate', []))
      );
  }




  /** GET ScheduledFlight by id. Will 404 if id not found */
  getScheduledFlightByFlightId(id: number): Observable<ScheduledFlight> {
    const url = `${this.scheduledFlightUrl}/${id}`;
    return this.http.get<ScheduledFlight>(url).pipe(
      tap(_ => this.log(`Fetched Scheduled Flight id=${id}`)),
      catchError(this.handleError<ScheduledFlight>(`getScheduledFlightBy FlightId: ${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new ScheduledFlight to the server */
  addScheduledFlight(scheduledFlight: ScheduledFlight): Observable<ScheduledFlight> {
    return this.http.post<ScheduledFlight>(this.scheduledFlightUrl, scheduledFlight, this.httpOptions).pipe(
      tap((newScheduledFlight: ScheduledFlight) =>
        this.log(`Made ScheduledFlight with Scheduled Flight id: ${newScheduledFlight.scheduleFlightId}`)),
      catchError(this.handleError<ScheduledFlight>('addScheduledFlight'))
    );
  }

  /** DELETE: delete the ScheduledFlight from the server */
  deleteScheduledFlight(id: number): Observable<ScheduledFlight> {
    const url = `${this.scheduledFlightUrl}/${id}`;
    return this.http.delete<ScheduledFlight>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Scheduled Flight id: ${id}`)),
      catchError(this.handleError<ScheduledFlight>('deleteScheduledFlight'))
    );
  }

  /** PUT: update the ScheduledFlight on the server */
  updateScheduledFlight(scheduledFlight: ScheduledFlight): Observable<any> {
    const url = `${this.scheduledFlightUrl}/${scheduledFlight.scheduleFlightId}`;
    return this.http.put(url, scheduledFlight, this.httpOptions).pipe(
      tap(_ => this.log(`Updated scheduled flight id: ${scheduledFlight.scheduleFlightId}`)),
      catchError(this.handleError<any>('updateScheduledFlight'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    alert('Server message:' + message);
  }
}
