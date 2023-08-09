import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  interval,
  takeUntil,
  Subscription,
  finalize,
  of,
} from 'rxjs';
import { Round } from '@interfaces/rounds/round.interface';
import { ApiService } from './abstracts/api.service';
import { API_KEY_CONNECTION } from './http-utils/apis-url';
import { AuthService } from './auth.service';
import { HttpUtils } from './http-utils/http-utils';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
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
    @Inject(PLATFORM_ID) private platformId: string,
    private readonly authService: AuthService,
    private readonly apiServiceLastRound: ApiService<Round[]>,
    private readonly http: HttpClient
  ) {}

  public getLastRounds(): Observable<Round[]> {
    if (this.authService.user && this.authService.user.id) {
      const params = {
        userId: this.authService.user.id,
        limit: 10,
      };
      return this.apiServiceLastRound.getData(
        API_KEY_CONNECTION.GET_LASTROUND,
        params,
        true,
        false
      );
    }
    //O lo que sea
    return this.apiServiceLastRound.getData(
      API_KEY_CONNECTION.GET_LASTROUND,
      {},
      true,
      false
    );
  }

  public getNextRound(): Observable<Round> {
    const salt = new Date().getTime();
    const user: User | undefined = this.authService.user;

    const url: string = `${this.url}nextround`;
    const headers = new HttpHeaders({
      userName: user?.name ?? '',
      password: user?.pass ?? '',
    });

    return this.http.get<Round>(`${url}?${salt}`, { headers });
  }

  public clearNextRound(value: Round | undefined = undefined): void {
    this.roundSubject.next(value);
  }

  public calcCountdown(time: string): void {
    const endTime: Date = new Date(time);
    let currentTime = new Date();
    let diffInSeconds = Math.floor(
      (endTime.getTime() - currentTime.getTime()) / 1000
    );

    console.log('dif in seconds: ', diffInSeconds);
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
    if (this.subInterval) {
      this.subInterval.unsubscribe();
      this.subInterval = undefined;
    }
  }
}
