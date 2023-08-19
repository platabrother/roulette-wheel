import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PlateModule } from '@components/plate/plate.module';
import { BallModule } from '@components/ball/ball.module';
import { ResultsModule } from '@components/results/results.module';
import { WinnerModule } from '@components/winner/winner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule,
    PlateModule,
    BallModule,
    ResultsModule,
    WinnerModule
  ],
  declarations: [DashboardPage],
})
export class DashboardModule {}
