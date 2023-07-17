import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Animation } from '@ionic/angular';
import { AnimationService } from '@services/animation.service';
import { NUMBERS, RED_NUMBERS, ROULETTE_VEL } from '@constants/constants';

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

  private result: number = 5;
  public rouletteNumb: number = 36;

  public maskText!: string;
  public resultColor!: string;

  private plateAnimation!: Animation;
  private innerAnimation!: Animation;
  private interval: any;

  public red: number[] = RED_NUMBERS;
  public numbers: number[] = NUMBERS;

  constructor(private readonly animService: AnimationService) {}

  ngAfterViewInit(): void {
    this.plateAnimation = this.animService.createRotateAnimation(this.plate);
    this.innerAnimation = this.animService.createRotateAnimation(this.inner);
  }

  public onPlay(): void {
    this.innerAnimation?.play();
    //this.plateAnimation?.play();

    // const finalLap: number = this.generateRandomLaps(1, 5);
    const finalLap: number = 3;
    let lap: number = 0;

    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.rouletteNumb === this.result && lap >= finalLap) {
          clearInterval(this.interval);
          this.interval = undefined;

          this.onPause();
        } else {
          if (this.rouletteNumb === 36) {
            lap++;
            this.rouletteNumb = 0;
          }
          this.rouletteNumb = ++this.rouletteNumb;
        }
      }, ROULETTE_VEL / 36);
    }
  }

  public onPause(): void {
    //this.plateAnimation?.pause();
    this.innerAnimation?.pause();

    clearInterval(this.interval);
    this.interval = undefined;
  }

  public onReset(): void {
    //this.plateAnimation?.stop();
    this.innerAnimation?.stop();

    clearInterval(this.interval);
    this.interval = undefined;

    this.rouletteNumb = 0;
  }

  private generateRandomLaps(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
