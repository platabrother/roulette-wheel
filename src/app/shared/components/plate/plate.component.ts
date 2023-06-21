import { Component, ElementRef, ViewChild } from '@angular/core';
import { Animation } from '@ionic/angular';
import { AnimationService } from '@services/animation.service';

@Component({
  selector: 'app-plate',
  templateUrl: 'plate.component.html',
  styleUrls: ['plate.component.scss'],
})
export class PlateComponent {
  @ViewChild('inner', { static: true }) inner!: ElementRef;
  @ViewChild('data', { static: true }) data!: ElementRef;
  @ViewChild('mask') mask!: ElementRef;
  @ViewChild('plate') plate!: ElementRef;

  public maskText!: string;
  public resultNumber!: number;
  public resultColor!: string;

  public red = [
    32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
  ];
  public numbers: number[] = Array(37)
    .fill(0)
    .map((x, i) => i);

  constructor(private readonly animService: AnimationService) {}

  public onPlay(): void {
    const plateAnimation: Animation = this.animService.createRotateAnimation(
      this.plate
    );
    const innerAnimation: Animation = this.animService.createRotateAnimation(
      this.inner
    );

    plateAnimation.play();
    innerAnimation.play();
  }
}
