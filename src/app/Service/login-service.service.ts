import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from '../Model/users';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {UserLogin} from '../Model/user-login';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private loginUrl = 'http://localhost:9090/login';  // URL to web api

  constructor(private http: HttpClient) {
  }


  /** POST: add a new User to the server */
  userLogin(user: UserLogin): Observable<Users> {
    return this.http.post<Users>(this.loginUrl, user, this.httpOptions).pipe(
      tap((newUser: Users) => {
        if (newUser != null) {
          this.log(`Logged in with User Id: ${newUser.userId}`);
        } else if (newUser == null) {
          this.log(`Login failed, check username and password`);
        }
      }),
      catchError(this.handleError<Users>(`addUser`))
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
