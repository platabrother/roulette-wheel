import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PlateModule } from '../shared/components/plate/plate.module';
import { BallModule } from '../shared/components/ball/ball.module';
import { ResultsModule } from '../shared/components/results/results.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PlateModule,
    BallModule,
    ResultsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
