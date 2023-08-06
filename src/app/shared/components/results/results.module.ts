import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { ResultService } from '@services/result.service';
import { LimitResultPipe } from '@app/shared/pipes/limit-result.pipe';

@NgModule({
  declarations: [ResultsComponent, LimitResultPipe],
  exports: [ResultsComponent],
  imports: [CommonModule],
  providers: [ResultService],
})
export class ResultsModule {}
