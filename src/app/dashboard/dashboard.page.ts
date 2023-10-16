import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RoundService } from '@services/round.service';
import {
  Subscription,
  distinctUntilChanged,
  map,
  skip,
  debounceTime,
  filter,
  tap,
} from 'rxjs';
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
  private subLastRound!: Subscription;
  private subNextRound!: Subscription;

  private modal!: HTMLIonModalElement | undefined;

  public showWinnerResults: boolean = false;

  private countDown!: number;
  private _countNextRound = 0;

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

    this._subscriptionGetLastRound();
    this._subscriptionGetNextRound();
  }

  private _subscriptionGetLastRound(): void {
    this.subLastRound = this.roundService.roundList$
      .pipe(
        map((rounds: Round[]) => rounds[0]),
        distinctUntilChanged(
          (prev: Round, current: Round) =>
            JSON.stringify(prev) !== JSON.stringify(current)
        )
      )
      .subscribe((lastRound: Round) => {
        if (this.countDown <= 30) {
          if (this.showWinnerResults) return;
          this.onRoundCompleted();
          return;
        }

        this.showWinnerResults = false;
        this.betService.spin({ ...lastRound });
      });
  }

  private _subscriptionGetNextRound(): void {
    this.subNextRound = this.roundService.nextRound$
      .pipe(
        debounceTime(1500),
        filter((res: Round) => !!res)
      )
      .subscribe(() => {
        this._countNextRound++;
        if (this._countNextRound > 1) {
          this._subscriptionGetLastRound();
        }
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
      this.roundService.getLastRounds();
      this.roundService.requestNextRound();
    }

    if (!isSpinning && !this.showWinnerResults && !this.modal)
      this.onRoundCompleted();
  }

  ngOnDestroy(): void {
    this.subCountdown.unsubscribe();
    this.subLastRound.unsubscribe();
    this.subNextRound.unsubscribe();
    this.roundService.resetInterval();
  }
}
