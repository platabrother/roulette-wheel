import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Round } from '@interfaces/rounds/round.interface';
import { AuthService } from './auth.service';
import { User } from '@interfaces/user';

@Injectable()
export class RoundService {
  private readonly url: string = 'http://38.242.243.231:3005/rounds/';

  private roundSubject: BehaviorSubject<Round | any> = new BehaviorSubject(
    undefined
  );
  public nextRound$: Observable<Round | null> =
    this.roundSubject.asObservable();

  private countdownSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public countdown$: Observable<number> = this.countdownSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  public getLastRounds(limit: number = 10): Observable<any> {
    const user: User | undefined = this.authService.user;

    const url: string = `${this.url}lastrounds?limit=${limit}`;
    const headers = new HttpHeaders({
      userName: user?.name ?? '',
      password: user?.pass ?? '',
    });

    return this.http.get(url, { headers });
  }

  public getNextRound(): void {
    const user: User | undefined = this.authService.user;

    const url: string = `${this.url}nextround`;
    const headers = new HttpHeaders({
      userName: user?.name ?? '',
      password: user?.pass ?? '',
    });

    this.http.get<Round>(url, { headers }).subscribe((res) => {
      this.roundSubject.next(res);
      this.calcCountdown(res?.closeTime);
    });
  }

  public clearNextRound(): void {
    this.roundSubject.next(undefined);
  }

  private calcCountdown(time: string): void {
    const currentTime = new Date();
    const endTime: Date = new Date(time);
    const diffInSeconds = Math.floor(
      (endTime.getTime() - currentTime.getTime()) / 1000
    );

    if(diffInSeconds < 0) return;

    setTimeout(() => {
      this.countdownSubject.next(diffInSeconds);
      this.calcCountdown(time);
    }, 1000);
  }
}
