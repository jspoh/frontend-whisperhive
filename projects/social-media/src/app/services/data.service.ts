import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../models/login-form';
import { Observable } from 'rxjs';
import { PostForm } from '../models/post-form';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly domainLink = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  // authentication

  /**
   * Check if user is logged in. Returns a boolean value.
   * @returns observable that sends a boolean value stating if user is logged in or not upon subscription
   */
  getCurrentUserData(): Observable<any> {
    return this.httpClient.get(`${this.domainLink}/authentication`, {
      withCredentials: true,
    });
  }

  /**
   * Sends a post request with login form payload for user authentication
   * @param data follows the LoginForm model and takes in the payload to be sent for authentication
   * @returns an observable that can be subscribed to make the request
   */
  loginUser(data: LoginForm): Observable<any> {
    return this.httpClient.post(`${this.domainLink}/login`, data, {
      withCredentials: true,
    });
  }

  /**
   * user: current user. displayUser: user whos profile we are viewing
   *
   * Get displayUser's data for displaying on profile page. Returns username and name of the displayUser to display on profile.
   *
   * Also returns current user's name (or empty string if not logged in) along with the following and follower list along with
   * all posts posted to displayUser.
   * @param username takes in the username of the profile you want to get data for
   * @returns an observable to sends the user data for the profile page
   */
  getUser(username: string): Observable<any> {
    return this.httpClient.get(`${this.domainLink}/user/${username}`, {
      withCredentials: true,
    });
  }

  /**
   * Get feed data. Returns current user's username and posts(and its comments) of users they are following
   * @returns an observable that sends the feed data depending on the user that is logged in
   */
  getFeed(): Observable<any> {
    return this.httpClient.get(`${this.domainLink}/feed`, {
      withCredentials: true,
    });
  }

  /**
   * Creates a post in the database
   * @param
   */
  createPost(post: PostForm) {
    return this.httpClient.post(`${this.domainLink}/post`, post, {
      withCredentials: true,
    });
  }
}
