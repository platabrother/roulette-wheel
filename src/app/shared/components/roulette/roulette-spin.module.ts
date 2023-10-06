import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RoundService } from '@services/round.service';
import { RouletteSpinComponent } from './roulette-spin.component';
import { RouletteBallComponent } from './components/roulette-ball/roulette-ball.component';

@NgModule({
  declarations: [RouletteSpinComponent, RouletteBallComponent],
  exports: [RouletteSpinComponent],
  imports: [CommonModule, IonicModule],
  providers: [RoundService],
  bootstrap: [],
})
export class RouletteModule {}
