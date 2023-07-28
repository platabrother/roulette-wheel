import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Round } from '@interfaces/rounds/round.interface';

@Injectable()
export class RoundService {
  private readonly url: string = 'http://38.242.243.231:3005/rounds/';

  private roundSubject: BehaviorSubject<Round | any> = new BehaviorSubject(
    undefined
  );
  public nextRound$: Observable<Round | null> =
    this.roundSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  public getLastRounds(limit: number = 10): Observable<any> {
    const url: string = `${this.url}lastrounds?limit=${limit}`;
    const headers = new HttpHeaders({
      userName: 'monitor',
      password: '1234',
    });

    return this.http.get(url, { headers });
  }

  public getNextRound(): void {
    const url: string = `${this.url}nextround`;
    const headers = new HttpHeaders({
      userName: 'monitor',
      password: '1234',
    });

    this.http
      .get<Round>(url, { headers })
      .subscribe((res) => this.roundSubject.next(res));
  }

  public clearNextRound(): void {
    this.roundSubject.next(undefined);
  }
}
