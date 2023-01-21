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
    COMMENTS: [],
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.postData.POSTED_ON = new Date(this.postData.POSTED_ON.toString());
  }

  onOpenProfile(event: any) {
    const currentTimeInMs = Date.now();
    const username =
      event.target.innerText.split('@').join('') || event.target.alt;
    if (username === 'anonymous') return;
    this.router.navigate([`user/${username}`]);
  }
}
