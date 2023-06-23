import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class RoundService {
  constructor() {}

  public getRoundNumber(): Observable<number> {
    return of(1492);
  }
}
