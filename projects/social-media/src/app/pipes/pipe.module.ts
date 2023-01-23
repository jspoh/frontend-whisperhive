import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAsLastXPipe } from './date-as-last-x.pipe';

@NgModule({
  declarations: [DateAsLastXPipe],
  imports: [CommonModule],
  exports: [DateAsLastXPipe],
})
export class PipeModule {}
