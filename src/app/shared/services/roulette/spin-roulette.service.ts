import { Injectable } from '@angular/core';
import { Cell } from '@interfaces/cell.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinRouletteService {
  public state: Subject<string> = new Subject();
  public slice = 360 / 37;
  public newDegrees!: number;

  public winNumber!: number;

  constructor() {}

  setDegrees(cell: Cell | undefined): void {
    if (cell) {
      this.newDegrees = cell.degrees - 3600;
      this.winNumber = cell.value;
    }
  }
}
