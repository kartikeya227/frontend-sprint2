import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Airport} from '../Model/airport';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  private airportsUrl = 'http://localhost:9090/admin/airport';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET All Airports from the server */
  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportsUrl)
      .pipe(
        tap(_ => this.log('fetched Airports')),
        catchError(this.handleError<Airport[]>(`getAirports`, []))
      );
  }

  /** GET Airports by id. Will 404 if id not found */
  getAirport(id: string): Observable<Airport> {
    const url = `${this.airportsUrl}/${id}`;
    return this.http.get<Airport>(url).pipe(
      tap(_ => this.log(`fetched Airport id=${id}`)),
      catchError(this.handleError<Airport>(`getAirport Airport Code: ${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Airport to the server */
  addAirport(airport: Airport): Observable<Airport> {
    return this.http.post<Airport>(this.airportsUrl, airport, this.httpOptions).pipe(
      tap((newAirport: Airport) => this.log(`Made Airport with code: ${newAirport.airportCode}`)),
      catchError(this.handleError<Airport>(`addAirport`))
    );
  }

  /** DELETE: delete the Airport from the server */
  deleteAirport(id: string): Observable<Airport> {
    const url = `${this.airportsUrl}/${id}`;
    return this.http.delete<Airport>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Airport code: ${id}`)),
      catchError(this.handleError<Airport>(`deleteAirport`))
    );
  }

  /** PUT: update the hero on the server */
  updateAirport(airport: Airport): Observable<any> {
    const url = `${this.airportsUrl}/${airport.airportCode}`;
    return this.http.put(url, airport, this.httpOptions).pipe(
      tap((newAirport: Airport) => this.log(`Updated Airport with code: ${newAirport.airportCode}`)),
      catchError(this.handleError<Airport>(`updateAirport`))
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
