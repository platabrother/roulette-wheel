import { Component, OnInit } from '@angular/core';
import { Result } from '@interfaces/result.interface';
import { ResultService } from '@services/result.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.scss'],
})
export class ResultsComponent implements OnInit {
  public results$!: Observable<Result[]>;

  constructor(private readonly resultService: ResultService) {}

  ngOnInit(): void {
    this.results$ = this.resultService.getAll();
  }
}
