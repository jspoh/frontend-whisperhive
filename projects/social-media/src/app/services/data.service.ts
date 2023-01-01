import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../models/login-form';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  domainLink = 'http://127.0.0.1:3000';

  constructor(private httpClient: HttpClient) {}

  loginUser(data: LoginForm) {
    return this.httpClient.post(`${this.domainLink}/login`, data);
  }
}
