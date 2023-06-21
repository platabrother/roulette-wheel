import { Component, ViewChild } from '@angular/core';
import { PlateComponent } from '../shared/components/plate/plate.component';
import { BallComponent } from '../shared/components/ball/ball.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('plate') plate!: PlateComponent;
  @ViewChild('ball') ball!: BallComponent;

  public previousResults: any[] = [];

  constructor() {}

  public onPlay(): void {
    this.plate.onPlay();
    this.ball.onPlay();
  }
}
