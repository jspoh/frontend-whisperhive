import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { BehaviorSubject, map, Subject, take, takeUntil, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';
import { Feed } from '../../models/feed';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  // feed: Feed = { username: '', data: [] };
  feedData$ = new Subject<Feed>();
  updateData$ = new Subject<void>();
  private unsubscribe$ = new Subject<void>();

  postsToRetrieve = 5;
  postsToRetrieveOnInit = 5;

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.updateFeedData();
    this.updateData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.updateFeedData());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateFeedData() {
    this.dataService
      .getFeed(this.postsToRetrieve)
      .pipe(
        map((val: any) => this.feedData$.next(val)),
        take(1)
      )
      .subscribe();
  }

  /**
   * Loads more posts onto page as user scrolls,
   * @param e Unused
   * @returns void
   */
  @HostListener('window:scroll', ['$event'])
  private onScroll(e: any): void {
    if (
      Math.ceil(window.scrollY) !==
      document.documentElement.scrollHeight - window.innerHeight
    ) {
      return;
    }

    // if user is at bottom of the page
    this.postsToRetrieve += this.postsToRetrieveOnInit;
    this.updateData$.next();
  }
}
