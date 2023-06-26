import { Component, OnInit } from '@angular/core';
import { Color } from '@interfaces/result.interface';
import { Round } from '@interfaces/rounds/round.interface';
import { ApiService } from '@services/abstracts/api.service';
import { API_KEY_CONNECTION } from '@services/http-utils/apis-url';
import { RoundService } from '@services/round.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.scss'],
})
export class ResultsComponent implements OnInit {
  public rounds$!: Observable<Round[]>;

  constructor(
    private readonly apiService: ApiService<Round>,
    private readonly roundService: RoundService
  ) {}

  ngOnInit(): void {
    this.rounds$ = this.roundService
      .getLastRounds()
      .pipe(
        map((rounds: Round[]) =>
          rounds.map((round: Round) => this.setRoundColor(round))
        )
      );
  }

  public onClickResult(): void {
    const userId = '5df4c314-83ab-4fb0-9fd2-fd78bcc0fedb';
    const params = { userId: userId };
    this.apiService
      .getData(API_KEY_CONNECTION.GET_NEXTROUND, params)
      .subscribe((result: Round) => {
        console.log(result);
      });
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
}
