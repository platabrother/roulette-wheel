import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnerComponent } from './winner.component';
import { ChronoFormatPipe } from '@app/shared/pipes/chrono-format.pipe';

@NgModule({
  declarations: [WinnerComponent, ChronoFormatPipe],
  exports: [WinnerComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class WinnerModule {}
