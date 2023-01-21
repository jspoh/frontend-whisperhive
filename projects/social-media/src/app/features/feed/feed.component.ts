import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { map, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  feed: { username: string; data: Post[] } = { username: '', data: [] };
  unsubscribe$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const feedObservable$ = this.dataService.getFeed();
    feedObservable$
      .pipe(
        map((val: any) => (this.feed = val)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((val) => this.userService.username$.next(val.username));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
