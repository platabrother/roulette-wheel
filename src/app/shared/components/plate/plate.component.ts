import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Animation } from '@ionic/angular';
import { AnimationService } from '@services/animation.service';
import { NUMBERS, RED_NUMBERS, ROULETTE_VEL } from '@constants/constants';

import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoundService } from '@services/round.service';

@Component({
  selector: 'app-plate',
  templateUrl: 'plate.component.html',
  styleUrls: ['plate.component.scss'],
})
export class PlateComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inner', { static: true }) inner!: ElementRef;
  @ViewChild('data', { static: true }) data!: ElementRef;
  @ViewChild('mask') mask!: ElementRef;
  @ViewChild('plate') plate!: ElementRef;

  @Output() isRoundEnded: EventEmitter<boolean> = new EventEmitter();

  private subNextRound!: Subscription;

  private stopSignal$ = new Subject<void>();
  private result!: number;
  public rouletteNumb: number = 36;

  public maskText!: string;
  public resultColor!: string;
  private innerAnimation!: Animation;
  private interval: any;

  public red: number[] = RED_NUMBERS;
  public numbers: number[] = NUMBERS;

  constructor(
    private readonly animService: AnimationService,
    private readonly roundService: RoundService
  ) {}

  ngAfterViewInit(): void {
    this.subNextRound = this.roundService.nextRound$.subscribe(
      (res) => (this.result = parseFloat(res?.winner || ''))
    );
    this.innerAnimation = this.animService.createRotateAnimation(this.inner);
  }

  public onPlay(): void {
    this.isRoundEnded.emit(false);
    this.innerAnimation?.play();
    //const finalLap: number = this.generateRandomLaps(1, 5);

    const finalLap: number = 6;
    const targetLaps: number =
      this.result < this.rouletteNumb ? finalLap + 1 : finalLap;
    let lap: number = 0;

    if (!this.interval) {
      this.interval = interval(ROULETTE_VEL / 36)
        .pipe(takeUntil(this.stopSignal$))
        .subscribe(() => {
          if (this.rouletteNumb === this.result && lap >= targetLaps) {
            this.onPause();
          } else {
            if (this.rouletteNumb === 36) {
              lap++;
              this.rouletteNumb = 0;
            }
            this.rouletteNumb = ++this.rouletteNumb;
          }
        });
    }
  }

  public onPause(): void {
    this.stopSignal$.next();
    this.innerAnimation?.pause();

    clearInterval(this.interval);
    this.interval = undefined;

    this.isRoundEnded.emit(true);
  }

  public onReset(): void {
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

  ngOnDestroy(): void {
    this.subNextRound.unsubscribe();
  }
}
