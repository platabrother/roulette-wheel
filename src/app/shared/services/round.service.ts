import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RoundService {
  private readonly url: string = 'http://38.242.243.231:3005/rounds/';

  constructor(private readonly http: HttpClient) {}


  public getLastRounds(limit: number = 10): Observable<any> {
    const url: string = `${this.url}lastrounds?limit=${limit}`;
    const headers = new HttpHeaders({
      userName: 'monitor',
      password: '1234',
    });

    return this.http.get(url, { headers });
  }
}
