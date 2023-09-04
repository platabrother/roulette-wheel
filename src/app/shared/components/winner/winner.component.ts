import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoundService } from '@services/round.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-winner',
  templateUrl: 'winner.component.html',
  styleUrls: ['winner.component.scss'],
})
export class WinnerComponent implements OnInit, OnDestroy {
  private subCountdown!: Subscription;
  private subNextRound!: Subscription;

  public countdown!: number;
  public nextRoundWinner!: string | undefined;

  constructor(
    private readonly roundService: RoundService,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.subCountdown = this.roundService.countdown$.subscribe(
      (value: number) => {
        if (value) this.countdown = value;
        else this.modalCtrl.dismiss();
      }
    );

    this.subNextRound = this.roundService.nextRound$.subscribe(
      (res) => (this.nextRoundWinner = res?.winner)
    );
  }

  ngOnDestroy(): void {
    this.subCountdown.unsubscribe();
    this.subNextRound.unsubscribe();
  }
}
