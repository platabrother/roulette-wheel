import { Component, OnDestroy, OnInit } from '@angular/core';
import { Color } from '@interfaces/result.interface';
import { Round } from '@interfaces/rounds/round.interface';
import { RoundService } from '@services/round.service';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  private subCountdown!: Subscription;

  public rounds$!: Observable<Round[]>;

  constructor(private readonly roundService: RoundService) {}

  ngOnInit(): void {
    this.rounds$ = this.getLastRounds();
  }

  private getLastRounds(): Observable<Round[]> {
    return this.roundService
      .getLastRounds()
      .pipe(
        map((rounds: Round[]) =>
          rounds.map((round: Round) => this.setRoundColor(round))
        )
      );
  }

  private setRoundColor(round: Round): Round {
    // par number
    if (this.isEven(+round?.winner)) round.color = Color.R;
    // no par number
    else round.color = Color.B;

    // number 36
    if (+round.winner === 36) round.color = Color.G;
    return round;
  }

  private isEven(n: number): boolean {
    return n % 2 === 0;
  }

  ngOnDestroy(): void {
    this.subCountdown.unsubscribe();
  }
}
