import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private url = environment.local.uriSocket;
  private socket;

  constructor() {
    try {
      this.socket = io(this.url);
    } catch (err) {
      console.log('socketService error:', err);
    }
  }

  send(name, type, data) {
    this.socket.emit(`${name}_${type}`, data);
  }

  onMessage() {
    return new Observable((observer) => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }
}
