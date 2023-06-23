import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Animation } from '@ionic/angular';
import { AnimationService } from '@services/animation.service';

@Component({
  selector: 'app-plate',
  templateUrl: 'plate.component.html',
  styleUrls: ['plate.component.scss'],
})
export class PlateComponent implements AfterViewInit {
  @ViewChild('inner', { static: true }) inner!: ElementRef;
  @ViewChild('data', { static: true }) data!: ElementRef;
  @ViewChild('mask') mask!: ElementRef;
  @ViewChild('plate') plate!: ElementRef;

  public maskText!: string;
  public resultNumber!: number;
  public resultColor!: string;

  private plateAnimation!: Animation;
  private innerAnimation!: Animation;

  public red: number[] = [
    32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
  ];
  public numbers: number[] = Array(37)
    .fill(0)
    .map((x, i) => i);

  constructor(private readonly animService: AnimationService) {}

  ngAfterViewInit(): void {
    this.plateAnimation = this.animService.createRotateAnimation(this.plate);
    this.innerAnimation = this.animService.createRotateAnimation(this.inner);
  }

  public onPlay(): void {
    this.plateAnimation?.play();
    this.innerAnimation?.play();
  }

  public onPause(): void {
    this.plateAnimation?.pause();
    this.innerAnimation?.pause();
  }

  public onReset(): void {
    this.plateAnimation?.stop();
    this.innerAnimation?.stop();
  }
}
