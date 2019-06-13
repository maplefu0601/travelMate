import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { MessageService } from '../../services/message.service';
import { CommonService } from '../../services/common.service';
import { SocketService } from '../../services/socket.service';
import { MessageObj } from '../../messageObj';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  // messages: Array<Object>;
  messages = [];

  constructor(
    private messageService: MessageService,
    private commonService: CommonService,
    private socketService: SocketService,
  ) {
    this.getMessages();
  }

  ngOnInit() {
    this.socketService.onMessage().subscribe((message: MessageObj) => {
      console.log('Message:', message);
      if (message.hasOwnProperty('name')) {
        let msg = message.name.split('_');
        if (msg[0] === 'Message') {
          let type = msg[1];
          switch (type) {
            case 'new':
              console.log('added message:', message.message);
              this.messages.unshift(message.message);
              break;
            case 'delete':
              break;
            default:
              break;
          }
        }
      }
    });
  }

  isOwner(name) {
    return this.commonService.isOwner(name);
  }

  getMessages() {
    this.messageService.getAll().subscribe((res) => {
      console.log('all messages', res);
      Array(res).reverse();
      Object.assign(this.messages, res);
    });
  }

  add(msg) {
    console.log(msg);
    this.messageService.add(msg).subscribe((res) => {
      console.log('Added message: ', res);
      // this.messages.unshift(res);
      this.socketService.send('Message', 'new', res);
    }),
      (err) => {
        console.log('add message error:', err);
      };
  }

  delete(msg) {
    this.messageService.delete(msg.id).subscribe((res) => {
      console.log('removed message: ', res);
      let index = this.messages.findIndex((e) => e.id === msg.id);
      this.messages.splice(index, 1);
    }),
      (err) => {
        console.log('remove message error:', err);
      };
  }
}
