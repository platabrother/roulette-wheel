import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlateComponent } from '@components/plate/plate.component';
import { BallComponent } from '@components/ball/ball.component';
import { RoundService } from '@services/round.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {
  @ViewChild('plate') plate!: PlateComponent;
  @ViewChild('ball') ball!: BallComponent;

  constructor(private readonly roundService: RoundService) {}

  ngOnInit(): void {
    this.roundService.countdown$.subscribe((res) => console.log(res));
  }

  ngAfterViewInit(): void {
    this.onPlay();
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
}
