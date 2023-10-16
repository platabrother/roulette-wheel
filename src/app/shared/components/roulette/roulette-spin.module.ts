import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouletteSpinComponent } from './roulette-spin.component';
import { RouletteBallComponent } from './components/roulette-ball/roulette-ball.component';

@NgModule({
  declarations: [RouletteSpinComponent, RouletteBallComponent],
  exports: [RouletteSpinComponent],
  imports: [CommonModule, IonicModule],
  providers: [],
  bootstrap: [],
})
export class RouletteModule {}
