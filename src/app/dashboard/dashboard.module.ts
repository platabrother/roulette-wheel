import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ResultsModule } from '@components/results/results.module';
import { ToolbarModule } from '@components/header/toolbar.module';
import { WheelModule } from '@components/wheel/wheel.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule,
    ResultsModule,
    ToolbarModule,
    WheelModule, 
  ],
  declarations: [DashboardPage],
})
export class DashboardModule {}
