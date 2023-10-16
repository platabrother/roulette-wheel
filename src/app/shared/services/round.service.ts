import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  interval,
  takeUntil,
  switchMap,
  EMPTY,
  debounceTime,
  map,
} from 'rxjs';
import { Round } from '@interfaces/rounds/round.interface';
import { ApiService } from './abstracts/api.service';
import { API_KEY_CONNECTION } from './http-utils/apis-url';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private roundSubject: Subject<Round | any> = new Subject();
  private roundListSubject: Subject<Round[]> = new Subject();
  private stopSignal: Subject<void> = new Subject<void>();
  private countdownSubject: Subject<number> = new Subject();
  private fetchNextRoundTrigger = new Subject<void>();

  public nextRound$: Observable<Round> = this.roundSubject.asObservable();
  public roundList$: Observable<Round[]> = this.roundListSubject.asObservable();
  public countdown$: Observable<number> = this.countdownSubject.asObservable();

  private subInterval!: any;
  private _numberWinner!: string | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly apiServiceLastRound: ApiService<Round[]>,
    private readonly apiServiceNextRound: ApiService<Round>
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
          let salt = new Date().getTime();
          const params = {
            userId: user.id,
            limit: 10,
            salt,
          };
          return this.apiServiceLastRound
            .getData(API_KEY_CONNECTION.GET_LASTROUND, params)
            .pipe(
              map((res: Round[]) => {
                this._numberWinner = '';
                this._numberWinner = res?.find((round) => round.winner)?.winner;

                this.roundListSubject.next(res);

                return res;
              })
            );
        }
        return EMPTY;
      })
    );
  }

  public getNextRound(): Observable<Round> {
    if (this.subInterval) return EMPTY;

    return this.authService.user$.pipe(
      debounceTime(1000),
      switchMap((user) => {
        if (user?.id) {
          let salt = new Date().getTime();
          const params = {
            userId: user.id,
            salt,
          };

          return this.apiServiceNextRound
            .getData(API_KEY_CONNECTION.GET_NEXTROUND, params)
            .pipe(
              map((res) => {
                if (res?.winner === null) {
                  if (this._numberWinner) res.winner = this._numberWinner;
                }
                return res;
              })
            );
        }
        return EMPTY;
      })
    );
  }

  public clearNextRound(value: Round | undefined = undefined): void {
    this.roundSubject.next({ ...value });
  }

  public calcCountdown(time: string): void {
    const endTime: Date = new Date(time);
    let currentTime = new Date();
    let diffInSeconds = Math.floor(
      (endTime.getTime() - currentTime.getTime()) / 1000
    );

    if (!this.subInterval)
      this.subInterval = interval(1000)
        .pipe(takeUntil(this.stopSignal))
        .subscribe(() => {
          currentTime = new Date();
          diffInSeconds = Math.floor(
            (endTime.getTime() - currentTime.getTime()) / 1000
          );
          this.countdownSubject.next(diffInSeconds);

          if (diffInSeconds <= 0) {
            this.stopSignal.next();
            this.resetInterval();
            this.requestNextRound();
            return;
          }
        });
  }

  public requestNextRound(): void {
    this.fetchNextRoundTrigger.next();
  }

  public resetInterval(): void {
    if (this.subInterval) {
      this.subInterval.unsubscribe();
      this.subInterval = undefined;
    }
  }
}
