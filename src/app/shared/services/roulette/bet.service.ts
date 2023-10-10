import { Injectable } from '@angular/core';
import { SpinRouletteService } from './spin-roulette.service';
import { Round } from '@interfaces/rounds/round.interface';
import { CELLS } from '@constants/constants';
import { Cell } from '@interfaces/cell.interface';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  canIBet: boolean = false;
  isDisabled: boolean = false;
  spins: boolean = false;

  constructor(private readonly spinRouletteService: SpinRouletteService) {}

  spin(round?: Round | null) {
    if (!round) return;

    if (!this.canIBet) {
      const cell = CELLS.find((cell: Cell) => cell.value === +round.winner);
      this.spinRouletteService.setDegrees(cell);
      this.spins = true;
      this.isDisabled = true;

      setTimeout(() => {
        this.isDisabled = false;
        this.spins = false;
      }, 16000);

      this.spinRouletteService.state.next('start');
      this.spinRouletteService.state.next('stop');
    }
  }
}
