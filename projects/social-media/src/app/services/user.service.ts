import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  username$ = new BehaviorSubject<string>('');

  userIsLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() {}
}
