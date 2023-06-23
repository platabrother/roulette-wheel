import { Component, ViewChild } from '@angular/core';
import { PlateComponent } from '@components/plate/plate.component';
import { BallComponent } from '@components/ball/ball.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('plate') plate!: PlateComponent;
  @ViewChild('ball') ball!: BallComponent;

  constructor() {}

  public onPlay(): void {
    this.plate.onPlay();
    this.ball.onPlay();
  }

  public onStop(): void {
    this.plate.onPause();
    this.ball.onPause();
  }

  public onReset(): void {
    this.plate.onReset();
    this.ball.onReset();
  }
}
