import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Animation } from '@ionic/angular';
import { AnimationService } from '@services/animation.service';

@Component({
  selector: 'app-ball',
  templateUrl: 'ball.component.html',
  styleUrls: ['ball.component.scss'],
})
export class BallComponent implements AfterViewInit {
  @ViewChild('ball') ball!: ElementRef;

  private ballAnimation!: Animation;

  constructor(private readonly animService: AnimationService) {}

  ngAfterViewInit(): void {
    this.ballAnimation = this.animService.createBallAnimation(this.ball);
  }

  public onPlay(): void {
    this.ballAnimation?.pause();
  }

  public onPause(): void {
    this.ballAnimation?.pause();
  }

  public onReset(): void {
    this.ballAnimation?.stop();
  }
}
