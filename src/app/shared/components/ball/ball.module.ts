import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallComponent } from './ball.component';

@NgModule({
  declarations: [BallComponent],
  exports: [BallComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class BallModule {}
