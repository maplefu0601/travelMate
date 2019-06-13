import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  uri = environment.local.uri;

  constructor(private http: HttpClient, private commonService: CommonService, private socketService: SocketService) {}

  getAll() {
    return this.http.get(`${this.uri}/event/findAll`);
  }
  add(content) {
    let obj = { content, by: this.commonService.getCurrentUser() };

    return this.http.post(`${this.uri}/event/add`, obj);
  }

  delete(id) {
    return this.http.post(`${this.uri}/event/remove`, { id });
  }
}
