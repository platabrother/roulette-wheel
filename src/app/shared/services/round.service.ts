import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  interval,
  takeUntil,
  switchMap,
  EMPTY
} from 'rxjs';
import { Round } from '@interfaces/rounds/round.interface';
import { ApiService } from './abstracts/api.service';
import { API_KEY_CONNECTION } from './http-utils/apis-url';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoundService {
  private roundSubject: BehaviorSubject<Round | any> = new BehaviorSubject(
    undefined
  );
  public nextRound$: Observable<Round | null> =
    this.roundSubject.asObservable();

  private stopSignal$ = new Subject<void>();
  private subInterval!: any;
  private countdownSubject: Subject<number> = new Subject();
  public countdown$: Observable<number> = this.countdownSubject.asObservable();
  private fetchNextRoundTrigger = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private readonly authService: AuthService,
    private readonly apiServiceLastRound: ApiService<Round[]>,
    private readonly apiServiceNextRound: ApiService<Round>,
    private readonly http: HttpClient
  ) {
    this.fetchNextRoundTrigger
      .pipe(switchMap(() => this.getNextRound()))
      .subscribe((res) => {
        this.clearNextRound(res);
        this.calcCountdown(res?.closeTime);
      });
  }

  public getLastRounds(): Observable<Round[]> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (user?.id) {
          const params = {
            userId: user.id,
            limit: 10,
          };
          return this.apiServiceLastRound.getData(
            API_KEY_CONNECTION.GET_LASTROUND,
            params
          );
        }
        return EMPTY;
      })
    );
  }

  public getNextRound(): Observable<Round> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (user?.id) {
          let salt = new Date().getTime();
          const params = {
            userId: user.id,
            salt,
          };

          return this.apiServiceNextRound.getData(
            API_KEY_CONNECTION.GET_NEXTROUND,
            params
          );
        }
        return EMPTY;
      })
    );
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

          if (diffInSeconds <= 0) {
            this.resetInterval();
            return;
          }
        });
  }

  public requestNextRound(): void {
    this.fetchNextRoundTrigger.next();
  }

  private resetInterval(): void {
    this.stopSignal$.next();
    if (this.subInterval) {
      this.subInterval.unsubscribe();
      this.subInterval = undefined;
    }
    this.requestNextRound();
  }
}
