
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Guest, GuestResponse } from './guest.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKey
  })
};

@Injectable()
export class GuestService {
  private guestsUrl = `${environment.apiUrl}/api/guests`;

  constructor(private http: HttpClient) {}

  getGuest(code: string): Observable<Guest> {
    const url = `${this.guestsUrl}/${code}`;
    return this.http.get<GuestResponse>(url, httpOptions)
      .pipe(
        map(guest => <Guest>guest.data),
        catchError(this.handleError<Guest>(`getGuest code=${code}`))
      );
  }

  updateGuest(guest: Guest): Observable<Guest> {
    const url = `${this.guestsUrl}/${guest.code}`;

    return this.http.put<GuestResponse>(url, guest, httpOptions).pipe(
      map(guest => <Guest>guest.data),
      catchError(this.handleError<Guest>('updateGuest'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(operation);
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return observableThrowError(error.error);
    }
  }
}
