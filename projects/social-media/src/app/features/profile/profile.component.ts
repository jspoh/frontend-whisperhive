import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {
  map,
  takeUntil,
  Subject,
  take,
  filter,
  tap,
  BehaviorSubject,
} from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChildren('posts') private posts?: QueryList<ElementRef>;

  userData$ = new BehaviorSubject<User>({
    username: '',
    name: '',
    data: { currentUser: '', followingList: [], followerList: [], posts: [] },
  });

  /**
   * Call next() on this subject after data is updated. For example, after a new post is created.
   */
  updateData$ = new Subject<void>();

  private unsubscribe$ = new Subject<void>();

  postsToRetrieveOnInit = 5;
  postsToRetrieve = 5;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData(this.postsToRetrieveOnInit);

    this.updateData$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.getUserData(this.postsToRetrieve);
    });

    /**
     * Required to get new user's data on page change. For example, when user clicks on another user profile while on another user's page
     */
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.getUserData(this.postsToRetrieveOnInit);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getUserData(postsToRetrieve: number) {
    this.dataService
      .getUser(this.activatedRoute.snapshot.url[0].path, postsToRetrieve)
      .pipe(
        map((response: any) => this.userData$.next(response)),
        take(1)
      )
      .subscribe({
        next(res) {},
        error(err) {},
        complete() {},
      });
  }

  scrollToPosts() {
    console.log(this.posts);
    this.posts?.get(0)?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll(e: any) {
    console.log(
      window.scrollY,
      document.documentElement.scrollHeight - window.innerHeight
    );

    if (
      Math.ceil(window.scrollY) !==
      document.documentElement.scrollHeight - window.innerHeight
    ) {
      return;
    }

    // if user is at bottom of the page
    console.log(this.postsToRetrieve);
    this.postsToRetrieve += this.postsToRetrieveOnInit;
    this.updateData$.next();
  }
}
