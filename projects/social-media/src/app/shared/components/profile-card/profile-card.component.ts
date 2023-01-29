import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { take } from 'rxjs';

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

  @Output() whispersClicked = new EventEmitter();

  isFollowing = false;

  /**
   * This input only takes in 'lg', 'md', 'sm'
   */
  @Input() cardSize = 'lg';

  constructor(
    private router: Router,
    private userService: UserService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  onFollowAction(follow: boolean) {
    if (!this.userService.userIsLoggedIn$.getValue()) {
      this.userService.onUserNotLoggedInAction();
      return;
    }

    const payload = {
      current_user: this.userData.data.currentUser,
      viewing_user: this.userData.username,
      follow: follow,
    };

    this.dataService
      .followAction(payload)
      .pipe(take(1))
      .subscribe({
        next(value) {
          console.log(value);
        },
        error(err) {
          console.error(err);
        },
      });
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

  onWhispersClicked() {
    this.whispersClicked.emit();
  }
}
