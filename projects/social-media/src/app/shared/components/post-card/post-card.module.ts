import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { DateAsLastXPipe } from '../../../pipes/date-as-last-x.pipe';
import { PipeModule } from '../../../pipes/pipe.module';

@NgModule({
  declarations: [PostCardComponent],
  imports: [CommonModule, PipeModule],
  exports: [PostCardComponent],
})
export class PostCardModule {}
