import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  username$ = new BehaviorSubject<string>('');

  userIsLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  onUserNotLoggedInAction() {
    this.router.navigate(['/']);
  }
}
