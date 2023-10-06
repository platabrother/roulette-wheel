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
  selector: 'app-roulette-ball',
  templateUrl: './roulette-ball.component.html',
  styleUrls: ['./roulette-ball.component.scss'],
  animations: [
    trigger('spin', [
      // ...
      state(
        'start',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      state(
        'stop',
        style({
          transform: 'rotate({{degrees}}deg)',
        }),
        {
          params: { degrees: 0 },
        }
      ),
      transition('start => stop', [
        animate('14s cubic-bezier(0.575, 0.485, .32, 1.08)'),
      ]),
    ]),
  ],
})
export class RouletteBallComponent implements OnInit {
  state: any = 'start';
  newDegrees = Math.floor(Math.random() * 360) - 3600;

  constructor(public spinRouletteService: SpinRouletteService) {
    this.spinRouletteService.state.subscribe((value) => {
      setTimeout(() => (this.state = value), 10);
      this.newDegrees = this.spinRouletteService.newDegrees;
    });
  }

  ngOnInit() {}
}
