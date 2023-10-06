import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ResultsModule } from '@components/results/results.module';
import { WinnerModule } from '@components/winner/winner.module';
import { RouletteModule } from '@components/roulette/roulette-spin.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule,
    ResultsModule,
    WinnerModule,
    RouletteModule,
  ],
  declarations: [DashboardPage],
})
export class DashboardModule {}
