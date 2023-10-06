import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CELLS } from '@constants/constants';
import { Cell } from '@interfaces/cell.interface';
import { Color } from '@interfaces/result.interface';
import { Round } from '@interfaces/rounds/round.interface';
import { RoundService } from '@services/round.service';
import { Observable, Subject, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  private subCountdown!: Subscription;
  private subRounds!: Subscription;

  private winner!: Round;
  private rounds!: Round[];

  private bsRound: Subject<Round[]> = new Subject();
  public rounds$: Observable<Round[]> = this.bsRound.asObservable();

  @Input() set showWinnerResult(showWinner: boolean) {
    if (showWinner) {
      this.rounds.unshift(this.winner);
      this.rounds.pop();
      this.bsRound.next(this.rounds);
    }
  }

  constructor(private readonly roundService: RoundService) {}

  ngOnInit(): void {
    this.subRounds = this.getLastRounds().subscribe((res) => {
      this.bsRound.next(res);
      this.rounds = res;
    });

    this.subCountdown = this.roundService.countdown$.subscribe((res: number) =>
      this.onSubCountdown(res)
    );
  }

  private onSubCountdown(res: number): void {
    if (res <= 0) {
      setTimeout(() => {
        this.subRounds.unsubscribe();
        this.subRounds = this.getLastRounds().subscribe((response) => {
          this.bsRound.next(response);
          this.rounds = response;
        });
      }, 3000);
    }
  }

  private getLastRounds(): Observable<Round[]> {
    return this.roundService.getLastRounds().pipe(
      map((rounds: Round[]) => {
        this.winner = this.setRoundColor(rounds.shift() as Round);
        rounds.map((round: Round) => this.setRoundColor(round));
        return rounds;
      })
    );
  }

  private setRoundColor(round: Round): Round {
    const color: Color =
      CELLS.find((cell: Cell) => cell.value === +round.winner)?.background ||
      Color.B;
    round.color = color;
    return round;
  }

  ngOnDestroy(): void {
    this.subCountdown.unsubscribe();
    this.subRounds.unsubscribe();
  }
}
