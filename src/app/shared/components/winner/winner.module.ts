import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnerComponent } from './winner.component';

@NgModule({
  declarations: [WinnerComponent],
  exports: [WinnerComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class WinnerModule {}
