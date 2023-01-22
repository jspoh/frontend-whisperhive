import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PostCardModule } from '../../shared/components/post-card/post-card.module';
import { ProfileCardModule } from '../../shared/components/profile-card/profile-card.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PostCardModule,
    ProfileCardModule,
  ],
})
export class ProfileModule {}
