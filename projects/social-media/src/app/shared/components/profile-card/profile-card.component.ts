import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

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

  isFollowing = false;

  /**
   * This input only takes in 'lg', 'md', 'sm'
   */
  @Input() cardSize = 'lg';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  onFollowAction(follow: boolean) {
    if (!this.userService.userIsLoggedIn$.getValue()) {
      this.userService.onUserNotLoggedInAction();
      return;
    }
  }

  onMessage() {
    if (!this.userService.userIsLoggedIn$.getValue()) {
      this.userService.onUserNotLoggedInAction();
      return;
    }
  }

  onOptions() {
    if (!this.userService.userIsLoggedIn$.getValue()) {
      this.userService.onUserNotLoggedInAction();
      return;
    }
  }
}
