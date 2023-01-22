import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [CommonModule, FormsModule, QuillModule.forRoot()],
  exports: [CreatePostComponent],
})
export class CreatePostModule {}
