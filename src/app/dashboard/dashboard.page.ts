import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PlateComponent } from '@components/plate/plate.component';
import { BallComponent } from '@components/ball/ball.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit {
  @ViewChild('plate') plate!: PlateComponent;
  @ViewChild('ball') ball!: BallComponent;

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
