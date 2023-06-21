import { Component } from '@angular/core';
import { Color, Result } from '../../interfaces/result.interface';

@Component({
  selector: 'app-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.scss'],
})
export class ResultsComponent {
  public previousResults: Result[] = [
    { color: Color.R, num: 0 },
    { color: Color.B, num: 11 },
    { color: Color.R, num: 20 },
    { color: Color.R, num: 30 },
    { color: Color.B, num: 31 },
  ];

  constructor() {}
}
