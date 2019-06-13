import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  uri = environment.local.uri;

  constructor(private http: HttpClient, private commonService: CommonService, private socketService: SocketService) {}

  getAll() {
    return this.http.get(`${this.uri}/group/findAll`);
  }
  add(group) {
    let obj = group;
    obj.by = this.commonService.getCurrentUser();

    return this.http.post(`${this.uri}/group/add`, obj);
  }

  delete(id) {
    return this.http.post(`${this.uri}/group/remove`, { id });
  }

  join(idGroup, user) {
    let obj = { idGroup, user };
    return this.http.post(`${this.uri}/group/join`, obj);
  }

  quit(idGroup, user) {
    let obj = { idGroup, user };
    return this.http.post(`${this.uri}/group/quit`, obj);
  }
}
