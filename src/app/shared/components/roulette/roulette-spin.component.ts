import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SpinRouletteService } from '@services/roulette/spin-roulette.service';

@Component({
  selector: 'app-roulette-spin',
  templateUrl: './roulette-spin.component.html',
  styleUrls: ['./roulette-spin.component.scss'],
  animations: [
    trigger('spinRoulette', [
      state(
        'start',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      state(
        'stop',
        style({
          transform: 'rotate(2800deg)',
        })
      ),
      transition('start => stop', [
        animate('15s cubic-bezier(0.175, 0.885, 0.52, 1.08)'),
      ]),
    ]),
  ],
})
export class RouletteSpinComponent implements OnInit {
  state: any = 'start';

  constructor(public spinRouletteService: SpinRouletteService) {
    this.spinRouletteService.state.subscribe((value) => {
      setTimeout(() => (this.state = value), 12);
    });
  }

  ngOnInit() {}
}
