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
      { color: Color.R, num: 0 },
      { color: Color.B, num: 11 },
      { color: Color.R, num: 20 },
      { color: Color.R, num: 30 },
      { color: Color.B, num: 31 },
    ]);
  }
}
