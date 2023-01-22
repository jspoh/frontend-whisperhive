import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { PostCardModule } from '../../shared/components/post-card/post-card.module';
// import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    PostCardModule,
    // QuillModule.forRoot(),
  ],
})
export class FeedModule {}
