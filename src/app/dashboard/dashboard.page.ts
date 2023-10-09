import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { RoundService } from '@services/round.service';
import { Subscription, debounceTime, filter, skip } from 'rxjs';
import { Round } from '@interfaces/rounds/round.interface';
import { ModalController } from '@ionic/angular';
import { WinnerComponent } from '@components/winner/winner.component';
import { BetService } from '@services/roulette/bet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit, OnDestroy {
  private subCountdown!: Subscription;
  private subNextRound!: Subscription;

  private countDown!: number;
  private modal!: HTMLIonModalElement | undefined;

  public showWinnerResults: boolean = false;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly roundService: RoundService,
    private readonly betService: BetService
  ) {}

  ngAfterViewInit(): void {
    this.roundService.requestNextRound();

    this.subCountdown = this.roundService.countdown$
      .pipe(skip(1))
      .subscribe((res) => this.onCountdownSubscription(res));

    this.subNextRound = this.roundService.nextRound$
      .pipe(
        debounceTime(1500),
        filter((res: Round) => !!res)
      )
      .subscribe((round: Round) => {
        if (this.countDown <= 30) {
          if (this.showWinnerResults) return;
          this.onRoundCompleted();
          return;
        }

        this.showWinnerResults = false;
        this.betService.spin({ ...round });
      });
  }

  public async onRoundCompleted(): Promise<void> {
    this.showWinnerResults = true;

    this.modal = await this.modalCtrl.create({
      component: WinnerComponent,
      showBackdrop: true,
      animated: true,
      backdropDismiss: false,
    });

    this.modal.present();
    this.modal.onWillDismiss().then(() => (this.modal = undefined));
  }

  private onCountdownSubscription(res: number): void {
    const isSpinning: boolean = this.betService.spins;

    this.countDown = res;

    if (res <= 0) {
      this.roundService.requestNextRound();
      this.roundService.getLastRounds();
    }

    if (!isSpinning && !this.showWinnerResults && !this.modal)
      this.onRoundCompleted();
  }

  ngOnDestroy(): void {
    this.subCountdown.unsubscribe();
    this.subNextRound.unsubscribe();
    this.roundService.resetInterval();
  }
}
