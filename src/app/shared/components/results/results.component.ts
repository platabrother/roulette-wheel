import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  public subRounds!: Subscription;

  public rounds!: Round[];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly roundService: RoundService
  ) {}

  ngOnInit(): void {
    this.subRounds = this.getLastRounds().subscribe((res) => {
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
          this.rounds = response;
          this.cdr.detectChanges();
        });
      }, 3000);
    }
  }

  private getLastRounds(): Observable<Round[]> {
    return this.roundService.getLastRounds().pipe(
      map((rounds: Round[]) => {
        rounds.shift();
        rounds.map((round: Round) => this.setRoundColor(round));
        return rounds;
      })
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
    this.subRounds.unsubscribe();
  }
}
