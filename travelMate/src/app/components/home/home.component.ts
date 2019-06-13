import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users = [];
  messages = [];
  events = [];

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private eventService: EventService,
    private commonService: CommonService,
    private router: Router,
  ) {
    if (this.commonService.isLoggedIn()) {
      this.getMessages();
      this.getUsers();
      this.getEvents();
    } else {
      console.log('redirect to login...');
      this.goto('login');
    }
  }

  ngOnInit() {}

  getMessages() {
    this.messageService.getAll().subscribe((res) => {
      console.log('all messages', res);
      Object.assign(this.messages, res);
    });
  }

  getUsers() {
    this.userService.getAll().subscribe((res) => {
      console.log('all users today ', res);
      Object.assign(this.users, res);
    });
  }

  getEvents() {
    this.eventService.getAll().subscribe((res) => {
      console.log('all events', res);
      Object.assign(this.events, res);
    });
  }

  goto(name) {
    this.router.navigateByUrl('/' + name);
  }
}
