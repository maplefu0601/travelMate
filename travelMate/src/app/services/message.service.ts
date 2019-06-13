import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  uri = environment.local.uri;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  getAll() {
    return this.http.get(`${this.uri}/message/findAll`);
  }
  add(msg) {
    let obj = { msg, by: this.commonService.getCurrentUser() || 'test' };

    return this.http.post(`${this.uri}/message/add`, obj);
  }
  delete(id) {
    console.log('deleting message ', id);
    return this.http.post(`${this.uri}/message/remove`, { id });
  }
}
