import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { ResultService } from '@services/result.service';

@NgModule({
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
  imports: [CommonModule],
  providers: [ResultService],
})
export class ResultsModule {}
