import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { IonHeader, IonicModule } from '@ionic/angular';
import { RoundService } from '@services/round.service';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [CommonModule, IonicModule],
  providers: [RoundService],
  bootstrap: [],
})
export class ToolbarModule {}
