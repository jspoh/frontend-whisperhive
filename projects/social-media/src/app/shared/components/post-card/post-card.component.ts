import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

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

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.postData.POSTED_ON = new Date(this.postData.POSTED_ON.toString());
  }

  onOpenProfile(username: string | null) {
    if (username === null) return;
    this.router.navigate([`user/${username}`]);
  }

  onLike(postId: number) {
    if (!this.userService.userIsLoggedIn$.getValue()) {
      this.userService.onUserNotLoggedInAction();
      return;
    }
    console.log('like', postId);
  }

  onComment(postId: number) {
    if (!this.userService.userIsLoggedIn$.getValue()) {
      this.userService.onUserNotLoggedInAction();
      return;
    }
    console.log('comment on', postId);
  }

  onShare(postId: number) {
    if (!this.userService.userIsLoggedIn$.getValue()) {
      this.userService.onUserNotLoggedInAction();
      return;
    }
    console.log('share', postId);
  }
}
