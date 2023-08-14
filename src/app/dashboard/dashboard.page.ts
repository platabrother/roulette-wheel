import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PlateComponent } from '@components/plate/plate.component';
import { BallComponent } from '@components/ball/ball.component';
import { RoundService } from '@services/round.service';
import { Subscription, filter } from 'rxjs';
import { Round } from '@interfaces/rounds/round.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit, OnDestroy {
  @ViewChild('plate') plate!: PlateComponent;
  @ViewChild('ball') ball!: BallComponent;

  private subCountdown!: Subscription;
  private subNextRound!: Subscription;

  constructor(private readonly roundService: RoundService) {}

  ngAfterViewInit(): void {
    this.roundService.requestNextRound();

    this.subCountdown = this.roundService.countdown$.subscribe((res: number) =>
      this.onCountdownSubscription(res)
    );

    this.subNextRound = this.roundService.nextRound$
      .pipe(filter((res: Round | null) => !!res))
      .subscribe(() => {
        this.onReset();
        this.onPlay();
      });
  }

  private onCountdownSubscription(res: number): void {
    if (res === 0) {
      setTimeout(() => {
        this.roundService.requestNextRound();
      }, 5000);
    }
  }

  public onPlay(): void {
    this.plate.onPlay();
  }

  public onStop(): void {
    this.plate.onPause();
  }

  public onReset(): void {
    this.plate.onReset();
  }

  ngOnDestroy(): void {
    this.subCountdown.unsubscribe();
    this.subNextRound.unsubscribe();
  }
}
