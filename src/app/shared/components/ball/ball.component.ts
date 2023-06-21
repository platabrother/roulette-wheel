import { Component, ElementRef, ViewChild } from '@angular/core';
import { Animation } from '@ionic/angular';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-ball',
  templateUrl: 'ball.component.html',
  styleUrls: ['ball.component.scss'],
})
export class BallComponent {
  @ViewChild('ball') ball!: ElementRef;

  constructor(private readonly animService: AnimationService) {}

  public onPlay(): void {
    const ballAnimation: Animation = this.animService.createBallAnimation(
      this.ball
    );

    ballAnimation.play();
  }
}
