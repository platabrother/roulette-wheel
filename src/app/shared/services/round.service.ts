import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  interval,
  takeUntil,
  Subscription,
  finalize,
} from 'rxjs';
import { Round } from '@interfaces/rounds/round.interface';
import { ApiService } from './abstracts/api.service';
import { API_KEY_CONNECTION } from './http-utils/apis-url';
import { AuthService } from './auth.service';
import { HttpUtils } from './http-utils/http-utils';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private readonly authService: AuthService,
    private readonly apiServiceLastRound: ApiService<Round[]>,
    private readonly apiServiceNextRound: ApiService<Round>,
    private readonly httpUtils: HttpUtils
  ) {
  }

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


public getNextRound(): void {
  if (this.authService.user && this.authService.user.id) {
    const params = {
      userId: this.authService.user.id,
    };
    this.httpUtils.deleteCacheItem(API_KEY_CONNECTION.GET_NEXTROUND);

    this.apiServiceNextRound
      .getData(API_KEY_CONNECTION.GET_NEXTROUND, params, true, false)
      .pipe(finalize(() => this.getNextRound()))
      .subscribe((res: Round) => {
        console.log('get next round: ', res);
        this.roundSubject.next(res);
        this.calcCountdown(res?.closeTime);
      });
  }
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
    if (this.subInterval) {
      this.subInterval.unsubscribe();
      this.subInterval = undefined;
    }
    this.getNextRound();
  }
}