import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { map, takeUntil, Subject, take, filter, tap } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChildren('posts') posts?: QueryList<ElementRef>;

  userData: User = {
    username: '',
    name: '',
    data: { currentUser: '', followingList: [], followerList: [], posts: [] },
  };

  unsubscribe$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((event: any) => {
        this.getUserData();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUserData() {
    this.dataService
      .getUser(this.activatedRoute.snapshot.url[0].path)
      .pipe(
        map((response: any) => (this.userData = response)),
        // takeUntil(this.unsubscribe$)
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
}
