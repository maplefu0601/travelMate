import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { EventService } from '../../services/event.service';
import { CommonService } from '../../services/common.service';
import { SocketService } from '../../services/socket.service';
import { MessageObj } from '../../messageObj';

@Component({
  selector: 'app-messages',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events = [];

  constructor(
    private eventService: EventService,
    private commonService: CommonService,
    private socketService: SocketService,
  ) {
    this.getEvents();
  }

  ngOnInit() {
    this.socketService.onMessage().subscribe((message: MessageObj) => {
      console.log('Event:', message);
      if (message.hasOwnProperty('name')) {
        let msg = message.name.split('_');
        if (msg[0] === 'Event') {
          let type = msg[1];
          switch (type) {
            case 'join':
            case 'quit':
            case 'new':
              console.log('Event :', message.message);
              this.events.unshift(message.message);
              break;
            case 'delete':
              break;
            default:
              break;
          }
        } else if (msg[0] === 'Group') {
          console.log('add group event:', message.message.name);
          this.add(`${message.message.user} ${msg[1]} group "${message.message.name}"`);
        }
      }
    });
  }

  isOwner(name) {
    return this.commonService.isOwner(name);
  }

  getEvents() {
    this.eventService.getAll().subscribe((res) => {
      console.log('all events', res);

      Object.assign(this.events, res);
      this.events.reverse();
    });
  }

  add(event) {
    console.log(event);
    this.eventService.add(event).subscribe((res) => {
      console.log('Added event: ', res);
      // this.events.unshift(res);
      this.socketService.send('Event', 'new', res);
    }),
      (err) => {
        console.log('add event error:', err);
      };
  }

  delete(event) {
    console.log('deleting ', event);
    this.eventService.delete(event.id).subscribe((res) => {
      console.log('removed event: ', res);
      this.events.splice(this.events.findIndex((e) => e.id === event.id), 1);
    }),
      (err) => {
        console.log('remove event error:', err);
      };
  }
}
