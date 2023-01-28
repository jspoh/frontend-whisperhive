import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subject, takeUntil, take, debounceTime } from 'rxjs';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showNavMenu = false;

  searchContent = '';

  navbarBtns: {
    title: string;
    routerLink: string;
    img_src?: string;
    img_alt?: string;
  }[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.username$
      .pipe(takeUntil(this.unsubscribe$), debounceTime(100))
      .subscribe((username) => {
        this.navbarBtns = [
          {
            title: 'profile',
            routerLink: `user/${username}`,
          },
          {
            title: 'logout',
            routerLink: 'logout',
            img_src: '../../../../assets/header/icons8-logout-96.png',
          },
        ];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleNavMenu() {
    this.showNavMenu = !this.showNavMenu;
  }

  closeNavMenu() {
    this.showNavMenu = false;
  }

  onSearch() {
    console.log(this.searchContent);
  }
}
