// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TimeZoneService {
//   private apiUrl = 'https://localhost:5096/TimeZone';

//   constructor(private http: HttpClient) { }

//   getLocalTime(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/local`);
//   }

//   getAllTimeZones(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/all`);
//   }

//   getTimeZoneById(timeZoneId: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${timeZoneId}`);
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TimeZoneService {
//   private apiUrl = 'http://localhost:5096/TimeZone'; // Adjust the URL as needed

//   constructor(private http: HttpClient) { }

//   getLocalTime(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/local`);
//   }

//   getAllTimeZones(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/all`);
//   }

//   getTimeZoneById(timeZoneId: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${timeZoneId}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {
  // private apiUrl = environment.apiUrl; // Use the environment variable for the backend URL
  private apiUrl = 'http://localhost:5096/TimeZone'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getLocalTime(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/local`);
  }

  getAllTimeZones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getTimeZoneById(timeZoneId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${timeZoneId}`);
  }

  getCurrentTimePeriodically(timeZoneId: string): Observable<any> {
    return interval(1000).pipe(
      switchMap(() => this.getTimeZoneById(timeZoneId))
    );
  }
}