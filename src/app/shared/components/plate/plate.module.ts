import { NgModule } from '@angular/core';
import { PlateComponent } from './plate.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PlateComponent],
  exports: [PlateComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
})
export class PlateModule {}
