import { Injectable } from '@angular/core';
import { Cell } from '@interfaces/cell.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinRouletteService {
  public state: Subject<string> = new Subject();
  public slice = 360 / 37;
  public newDegrees = Math.floor(Math.random() * 360) - 3600;

  public winNumber!: number;

  constructor() {}

  setDegrees(cell: Cell | undefined): void {
    if (cell) {
      this.newDegrees = cell.degrees;
      this.winNumber = cell.value;
    }

    //   CELLS[
    //     Math.floor((3600 + (this.newDegrees + this.slice / 2)) / this.slice)
    //   ].value;
  }
}
