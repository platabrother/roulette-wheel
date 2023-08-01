import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscribable,
  Subscription,
  interval,
  of,
  takeUntil,
} from 'rxjs';
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

  private stopSignal$ = new Subject<void>();
  private subInterval!: any;
  private countdownSubject: Subject<number> = new Subject();
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
      console.log('get next round: ', res);
      this.roundSubject.next(res);
      this.calcCountdown(res?.closeTime);
    });
  }

  public clearNextRound(): void {
    this.roundSubject.next(undefined);
  }

  private calcCountdown(time: string): void {
    const endTime: Date = new Date(time);
    let currentTime = new Date();
    let diffInSeconds = Math.floor(
      (endTime.getTime() - currentTime.getTime()) / 1000
    );

    if (!this.subInterval)
      this.subInterval = interval(1000)
        .pipe(takeUntil(this.stopSignal$))
        .subscribe(() => {
          currentTime = new Date();
          diffInSeconds = Math.floor(
            (endTime.getTime() - currentTime.getTime()) / 1000
          );

          this.countdownSubject.next(diffInSeconds);
          console.log(diffInSeconds);

          if (diffInSeconds <= 0) this.resetInterval();
        });
  }

  private resetInterval(): void {
    this.stopSignal$.next();
    clearInterval(this.subInterval);
    this.subInterval = undefined;

    this.getNextRound();
  }
}
