// flightsUrl = 'http://localhost:9090/admin/flights';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Flights} from '../Model/flights';


@Injectable({ providedIn: 'root' })
export class FlightsService {

  private flightsUrl = 'http://localhost:9090/admin/flights';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET All Flights from the server */
  getFlights(): Observable<Flights[]> {
    return this.http.get<Flights[]>(this.flightsUrl)
      .pipe(
        tap(_ => this.log('fetched Flights')),
        catchError(this.handleError<Flights[]>(`getFlights`, []))
      );
  }

  /** GET Flight by id. Will 404 if id not found */
  getFlight(id: number): Observable<Flights> {
    const url = `${this.flightsUrl}/${id}`;
    return this.http.get<Flights>(url).pipe(
      tap(_ => this.log(`fetched Flight id=${id}`)),
      catchError(this.handleError<Flights>(`getFlight id: ${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Flight to the server */
  addFlight(flight: Flights): Observable<Flights> {
    return this.http.post<Flights>(this.flightsUrl, flight, this.httpOptions).pipe(
      tap((newflight: Flights) => this.log(`Added new Flight with Flight Number: ${newflight.flightNumber}`)),
      catchError(this.handleError<Flights>(`addFlight`))
    );
  }

  /** DELETE: delete the Flight from the server */
  deleteFlight(id: number): Observable<Flights> {
    const url = `${this.flightsUrl}/${id}`;
    return this.http.delete<Flights>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Flight with Flight Number: ${id}`)),
      catchError(this.handleError<Flights>(`deleteFlight`))
    );
  }

  /** PUT: update the Flight on the server */
  updateFlight(flight: Flights): Observable<any> {
    const url = `${this.flightsUrl}/${flight.flightNumber}`;
    return this.http.put(url, flight, this.httpOptions).pipe(
      tap((newFlight: Flights) => this.log(`Updated Flight with Flight Number=${flight.flightNumber}`)),
      catchError(this.handleError<Flights>(`updateFlight`))
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
