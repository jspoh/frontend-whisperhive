import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../models/login-form';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly domainLink = 'http://127.0.0.1:3000';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  private getCookies() {
    return this.cookieService.getAll();
  }

  loginUser(data: LoginForm) {
    return this.httpClient.post(`${this.domainLink}/login`, data, {
      withCredentials: true,
    });
  }

  getFeed() {
    return this.httpClient.get(`${this.domainLink}/feed`, {
      withCredentials: true,
    });
  }
}
