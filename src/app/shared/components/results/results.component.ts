import { Component, OnInit } from '@angular/core';
import { Result } from '@interfaces/result.interface';
import { Rounds } from '@interfaces/rounds/round.interface';
import { ApiService } from '@services/abstracts/api.service';
import { API_KEY_CONNECTION } from '@services/http-utils/apis-url';
import { ResultService } from '@services/result.service';
import { RoundService } from '@services/round.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.scss'],
})
export class ResultsComponent implements OnInit {
  public results$!: Observable<Result[]>;

  constructor(
    private readonly resultService: ResultService,
    private readonly apiService: ApiService<Rounds>,
    private readonly roundService: RoundService
  ) {}

  ngOnInit(): void {
    this.results$ = this.resultService.getAll();
    this.roundService.getLastRounds().subscribe((res) => console.log(res));
  }

  public onClickResult(): void {
    const userId = '5df4c314-83ab-4fb0-9fd2-fd78bcc0fedb';
    const params = { userId: userId };
    this.apiService
      .getData(API_KEY_CONNECTION.GET_NEXTROUND, params)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
