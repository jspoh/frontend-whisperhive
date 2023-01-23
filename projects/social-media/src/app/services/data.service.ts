import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../models/login-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly domainLink = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @returns observable that sends a boolean value stating if user is logged in or not upon subscription
   */
  checkIfUserIsLoggedIn(): Observable<any> {
    return this.httpClient.get(`${this.domainLink}/authentication`, {
      withCredentials: true,
    });
  }

  /**
   *
   * @param data follows the LoginForm model and takes in the payload to be sent for authentication
   * @returns an observable that can be subscribed to make the request
   */
  loginUser(data: LoginForm): Observable<any> {
    return this.httpClient.post(`${this.domainLink}/login`, data, {
      withCredentials: true,
    });
  }

  /**
   *
   * @returns an observable that sends the feed data depending on the user that is logged in
   */
  getFeed(): Observable<any> {
    return this.httpClient.get(`${this.domainLink}/feed`, {
      withCredentials: true,
    });
  }

  /**
   *
   * @param username takes in the username of the profile you want to get data for
   * @returns an observable to sends the user data for the profile page
   */
  getUser(username: string): Observable<any> {
    return this.httpClient.get(`${this.domainLink}/user/${username}`, {
      withCredentials: true,
    });
  }
}
