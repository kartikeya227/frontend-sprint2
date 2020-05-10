// userUrl = 'http://localhost:9090/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Users} from '../Model/users';


@Injectable({ providedIn: 'root' })
export class UserService {

  private userUrl = 'http://localhost:9090/user';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET Users from the server */
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.userUrl)
      .pipe(
        tap(_ => this.log('Fetched Users')),
        catchError(this.handleError<Users[]>(`getUsers`, []))
      );
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<Users> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<Users>(url).pipe(
      tap(_ => this.log(`Fetched User Id: ${id}`)),
      catchError(this.handleError<Users>(`getUser Id: ${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser: Users) => this.log(`Made Account with User Id: ${newUser.userId}`)),
      catchError(this.handleError<Users>(`addUser`))
    );
  }

  /** DELETE: Delete the user from the server */
  deleteUser(id: number): Observable<Users> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<Users>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted User id: ${id}`)),
      catchError(this.handleError<Users>(`deleteUser`))
    );
  }

  /** PUT: update the hero on the server */
  updateUser(user: Users): Observable<any> {
    const url = `${this.userUrl}/${user.userId}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap((newUser: Users) => this.log(`Updated Booking with Id: ${newUser.userId}`)),
      catchError(this.handleError<Users>(`updateUser`))
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
