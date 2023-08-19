import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoundService } from '@services/round.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-winner',
  templateUrl: 'winner.component.html',
  styleUrls: ['winner.component.scss'],
})
export class WinnerComponent implements OnInit, OnDestroy {
  private subCountdown!: Subscription;

  public countdown!: number;

  constructor(private readonly roundService: RoundService) {}

  ngOnInit(): void {
    this.subCountdown = this.roundService.countdown$.subscribe(
      (value: number) => (this.countdown = value)
    );
  }

  ngOnDestroy(): void {
    this.subCountdown.unsubscribe();
  }
}
