import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  feed: any;
  unsubscribe$ = new Subject<void>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const feedObservable$ = this.dataService.getFeed();
    feedObservable$
      .pipe(
        map((val: any) => (this.feed = val)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
