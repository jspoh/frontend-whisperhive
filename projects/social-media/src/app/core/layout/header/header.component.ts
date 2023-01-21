import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() onLoginPage = false;

  showNavMenu = false;

  searchContent = '';

  navbarBtns: { title: string; routerLink: string }[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.username$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (username) =>
        (this.navbarBtns = [
          {
            title: 'profile',
            routerLink: `user/${username}`,
          },
          {
            title: 'logout',
            routerLink: 'logout',
          },
        ])
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openNavMenu() {
    this.showNavMenu = !this.showNavMenu;
  }

  onSearch() {
    console.log(this.searchContent);
  }
}
