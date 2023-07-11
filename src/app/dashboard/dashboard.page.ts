import { Component, OnInit, ViewChild } from '@angular/core';
import {
  TextAlignment,
  TextOrientation,
  WheelComponent,
} from '@components/wheel/wheel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(WheelComponent, { static: false }) wheel!: WheelComponent;

  private seed: number[] = [...Array(37).keys()];

  public MOCK_RESULT: number = 5;
  public items!: any[];
  public textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  public textAlignment: TextAlignment = TextAlignment.OUTER;

  constructor() {}

  ngOnInit(): void {
    const colors = ['#FF0000', '#000000', '#198754'];
    this.items = this.seed.map((value) => ({
      fillStyle: value === 36 ? colors[2] : colors[value % 2],
      text: `${value}`,
      id: value,
      textFillStyle: 'white',
      textFontSize: '16',
    }));
  }

  public beforeSpin(): void {
    alert('Your wheel is about to spin');
  }

  public async onPlay(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.wheel.spin();
  }

  public onReset(): void {
    this.wheel.reset();
  }

  public afterSpin(): void {
    alert('You have been bamboozled');
  }
}
