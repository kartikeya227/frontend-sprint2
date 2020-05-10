// bookingsUrl = 'http://localhost:9090/admin/airport';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Bookings} from '../Model/bookings';


@Injectable({ providedIn: 'root' })
export class BookingsService {

  private bookingsUrl = 'http://localhost:9090/ticket/bookings';  // URL to web api
  private bookingsUrlUserId = 'http://localhost:9090/ticket/bookingsByUserId';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET bookings from the server */
  getBookings(): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(this.bookingsUrl)
      .pipe(
        tap(_ => this.log('Fetched bookings')),
        catchError(this.handleError<Bookings[]>(`getBookings`, []))
      );
  }

  /** GET bookings by user ID from the server */
  getBookingsByUserId(id: number): Observable<Bookings[]> {
    const url = `${this.bookingsUrlUserId}/${id}`;
    return this.http.get<Bookings[]>(url)
      .pipe(
        tap(_ => this.log('Fetched bookings')),
        catchError(this.handleError<Bookings[]>(`getBooking By UserId: ${id}`, []))
      );
  }


  /** GET booking by id. Will 404 if id not found */
  getBooking(id: number): Observable<Bookings> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.get<Bookings>(url).pipe(
      tap(_ => this.log(`fetched Booking id=${id}`)),
      catchError(this.handleError<Bookings>(`getBooking id: ${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new booking to the server */
  addBooking(booking: Bookings): Observable<Bookings> {
    return this.http.post<Bookings>(this.bookingsUrl, booking, this.httpOptions).pipe(
      tap((newBooking: Bookings) => this.log(`Made Booking with id: ${newBooking.bookingId}`)),
      catchError(this.handleError<Bookings>(`addBooking`))
    );
  }

  /** DELETE: delete the Booking from the server */
  deleteBookings(id: number): Observable<Bookings> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.delete<Bookings>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Booking id=${id}`)),
      catchError(this.handleError<Bookings>(`deleteBooking`))
    );
  }

  /** PUT: update the Booking on the server */
  updateBookings(booking: Bookings): Observable<any> {
    const url = `${this.bookingsUrl}/${booking.bookingId}`;
    return this.http.put(url, booking, this.httpOptions).pipe(
      tap((newBooking: Bookings) => this.log(`Updated Booking with id: ${newBooking.bookingId}`)),
      catchError(this.handleError<Bookings>(`addBooking`))
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
