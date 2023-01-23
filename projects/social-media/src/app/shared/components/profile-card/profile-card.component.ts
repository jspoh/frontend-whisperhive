import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() userData: User = {
    username: '',
    name: '',
    data: { currentUser: '', followingList: [], followerList: [], posts: [] },
  };

  @Input() userIsLoggedIn = false;

  isFollowing = false;

  /**
   * This input only takes in 'lg', 'md', 'sm'
   */
  @Input() cardSize = 'lg';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onFollowAction(follow: boolean) {
    if (!this.userIsLoggedIn) {
      this.onUserNotLoggedInAction();
      return;
    }
  }

  onMessage() {
    if (!this.userIsLoggedIn) {
      this.onUserNotLoggedInAction();
      return;
    }
  }

  onOptions() {
    if (!this.userIsLoggedIn) {
      this.onUserNotLoggedInAction();
      return;
    }
  }

  onUserNotLoggedInAction() {
    this.router.navigate(['login']);
  }
}
