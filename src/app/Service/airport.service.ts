import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Airport} from '../Model/airport';

@Injectable()
export class AirportService {

  private airportUrl: string;
  constructor(private http: HttpClient) {
    this.airportUrl = 'http://localhost:9090/admin/airport';
  }


  public findAllAirport(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.airportUrl}/`);
  }

  // public searchAirportById(id: Number): Observable<Airport>{
  //   return this.http.get<Airport>(`${this.airportUrl}/${id}`);
  // }
  //
  public addAirport(airport: Airport): Observable<object>{
    console.log('airport service ke andar!');
    return this.http.post<Airport>(`${this.airportUrl}`, airport);
  }
}
