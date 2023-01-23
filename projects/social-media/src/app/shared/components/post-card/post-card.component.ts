import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() postData: Post = {
    POST_ID: -1,
    FROM_USER_ID: -1,
    TO_USER_ID: -1,
    MESSAGE: '',
    POSTED_ON: '',
    IS_ANON: false,
    IS_COMMENT: false,
    COMMENT_ON: null,
    FROM_USERNAME: null,
    TO_USERNAME: '',
    FROM_NAME: '',
    TO_NAME: '',
    COMMENTS: [],
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.postData.POSTED_ON = new Date(this.postData.POSTED_ON.toString());
  }

  onOpenProfile(username: string | null) {
    if (username === null) return;
    this.router.navigate([`user/${username}`]);
  }

  onLike(postId: number) {
    console.log('like', postId);
  }

  onComment(postId: number) {
    console.log('comment on', postId);
  }

  onShare(postId: number) {
    console.log('share', postId);
  }
}
