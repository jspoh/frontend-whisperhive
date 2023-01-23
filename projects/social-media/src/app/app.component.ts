import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { take } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dataService
      .getCurrentUserData()
      .pipe(take(1))
      .subscribe((user: { loggedIn: boolean; username: string }) => {
        this.userService.userIsLoggedIn$.next(user.loggedIn);
        this.userService.username$.next(user.username);
      });
  }
}
