import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from '../models/login-form';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly domainLink = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

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
