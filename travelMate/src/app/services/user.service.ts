import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uri = environment.local.uri;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  getAll() {
    return this.http.get(`${this.uri}/user/findAll`);
  }
  getAllToday() {
    return this.http.get(`${this.uri}/user/findAllToday`);
  }
  getHistoryToday() {
    return this.http.get(`${this.uri}/user/findHistoryToday`);
  }
  add(msg) {
    let obj = { msg, by: 'test' };

    return this.http.post(`${this.uri}/user/add`, obj);
  }
  register(user) {
    return this.http.post(`${this.uri}/user/register`, user);
  }
}
