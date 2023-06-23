import { ElementRef, Injectable } from '@angular/core';
import { BALL_VEL, ROULETTE_VEL } from '@constants/constants';
import { Animation, AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor(private readonly animationCtrl: AnimationController) {}

  public createRotateAnimation(element: ElementRef): Animation {
    return this.animationCtrl
      .create()
      .addElement(element.nativeElement)
      .duration(ROULETTE_VEL)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'rotateZ(0deg)' },
        { offset: 1, transform: 'rotateZ(-1turn)' },
      ]);
  }

  public createBallAnimation(element: ElementRef): Animation {
    return this.animationCtrl
      .create()
      .addElement(element.nativeElement)
      .duration(BALL_VEL)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'rotateZ(0deg)' },
        { offset: 1, transform: 'rotateZ(-360deg)' },
      ]);
  }
}
