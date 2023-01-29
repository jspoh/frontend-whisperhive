import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit, OnDestroy {
  @Input() userData: User = {
    username: '',
    name: '',
    following: null,
    data: { currentUser: '', followingList: [], followerList: [], posts: [] },
  };
  /**
   * This input only takes in 'lg', 'md', 'sm'
   */
  @Input() cardSize = 'lg';

  @Output() whispersClicked = new EventEmitter();

  unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFollowAction(follow: boolean) {
    if (!this.userService.userIsLoggedIn$.getValue()) {
      this.userService.onUserNotLoggedInAction();
      return;
    }

    const payload = {
      currentUser: this.userData.data.currentUser,
      viewingUser: this.userData.username,
      follow: follow,
    };

    this.dataService
      .followAction(payload)
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.userData.following = !this.userData.following;
        },
        error: (err) => {},
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
