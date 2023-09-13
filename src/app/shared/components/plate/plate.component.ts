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
import { NUMBERS, ROULETTE_VEL } from '@constants/constants';

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

  @Output() roundCompleted: EventEmitter<void> = new EventEmitter();

  private subNextRound!: Subscription;

  private stopSignal$ = new Subject<void>();
  private result!: number;

  public maskText!: string;
  public resultColor!: string;
  private innerAnimation!: Animation;
  private interval: any;

  public numbers: number[] = NUMBERS;
  public rouletteNumb: number = NUMBERS[0];

  constructor(
    private readonly animService: AnimationService,
    private readonly roundService: RoundService
  ) {}

  ngAfterViewInit(): void {
    this.onSubNextRound();
    this.innerAnimation = this.animService.createRotateAnimation(this.inner);
  }

  private onSubNextRound(): void {
    this.subNextRound = this.roundService.getLastRounds().subscribe((res) => {
      const winner: string | undefined = res?.find(
        (round) => round.winner
      )?.winner;
      if (winner) this.result = parseFloat(winner);
    });
  }

  public onPlay(): void {
    this.onSubNextRound();
    this.innerAnimation?.play();

    const finalLap: number = 6;
    const targetLaps: number =
      this.result < this.rouletteNumb ? finalLap + 1 : finalLap;
    let lap: number = 0;
    let index: number = 0;

    if (!this.interval) {
      this.interval = interval(ROULETTE_VEL / 36)
        .pipe(takeUntil(this.stopSignal$))
        .subscribe(() => {
          if (this.rouletteNumb === this.result && lap >= targetLaps) {
            this.onPause();
          } else {
            if (index === NUMBERS.length - 1) {
              lap++;
              index = 0;
            }
            this.rouletteNumb = NUMBERS[index];
            index++;
          }
        });
    }
  }

  public onPause(): void {
    this.stopSignal$.next();
    this.innerAnimation?.pause();

    clearInterval(this.interval);
    this.interval = undefined;

    this.roundCompleted.emit();
  }

  public onReset(): void {
    this.innerAnimation?.stop();

    clearInterval(this.interval);
    this.interval = undefined;

    this.rouletteNumb = 0;
  }

  ngOnDestroy(): void {
    this.subNextRound.unsubscribe();
  }
}
