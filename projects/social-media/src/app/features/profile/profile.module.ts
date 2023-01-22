import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PostCardModule } from '../../shared/components/post-card/post-card.module';
import { ProfileCardModule } from '../../shared/components/profile-card/profile-card.module';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { CreatePostModule } from '../../shared/components/create-post/create-post.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PostCardModule,
    ProfileCardModule,
    CreatePostModule,
  ],
})
export class ProfileModule {}
