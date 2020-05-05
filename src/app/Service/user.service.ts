import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Airport} from '../Model/airport';
import {Observable} from 'rxjs';
import {Users} from '../Model/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:9090/user';
  }

  public addUser(user: Users): Observable<Users>{
    return this.http.post<Users>(`${this.userUrl}`, user) ;
  }

  public findAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.userUrl}/`);
  }

}
