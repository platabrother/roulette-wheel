import { Injectable } from '@angular/core';
import { Color, Result } from '@interfaces/result.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor() {}

  public getAll(): Observable<Result[]> {
    return of([
      { color: Color.R, num: 0, round: 1, time: '23:30' },
      { color: Color.B, num: 11, round: 2, time: '23:35' },
      { color: Color.R, num: 20, round: 3, time: '23:40' },
      { color: Color.R, num: 30, round: 4, time: '23:45' },
      { color: Color.B, num: 31, round: 5, time: '23:50' },
    ]);
  }
}
