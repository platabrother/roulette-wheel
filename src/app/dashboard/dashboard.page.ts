import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { PlateComponent } from '@components/plate/plate.component';
import { BallComponent } from '@components/ball/ball.component';
import { RoundService } from '@services/round.service';
import { Subscription, debounceTime, filter } from 'rxjs';
import { Round } from '@interfaces/rounds/round.interface';
import { ModalController } from '@ionic/angular';
import { WinnerComponent } from '@components/winner/winner.component';

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

  private countDown!: number;

  public showWinnerResults: boolean = false;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly roundService: RoundService
  ) {}

  ngAfterViewInit(): void {
    this.roundService.requestNextRound();

    this.subCountdown = this.roundService.countdown$.subscribe((res: number) =>
      this.onCountdownSubscription(res)
    );

    this.subNextRound = this.roundService.nextRound$
      .pipe(
        debounceTime(1500),
        filter((res: Round | null) => !!res)
      )
      .subscribe(() => {
        if (this.countDown <= 30) return;

        this.showWinnerResults = false;

        this.plate.onReset();
        this.plate.onPlay();
      });
  }

  public async onRoundCompleted(): Promise<void> {
    this.showWinnerResults = true;

    const modal = await this.modalCtrl.create({
      component: WinnerComponent,
      showBackdrop: true,
      animated: true,
      backdropDismiss: false,
    });

    modal.present();
  }

  private onCountdownSubscription(res: number): void {
    this.countDown = res;

    if (res <= 0) {
      this.roundService.requestNextRound();
      this.roundService.getLastRounds();
    }
  }

  ngOnDestroy(): void {
    this.subCountdown.unsubscribe();
    this.subNextRound.unsubscribe();
    this.roundService.resetInterval();
  }
}
