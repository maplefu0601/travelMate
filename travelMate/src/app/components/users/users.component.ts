import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-messages',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(private userService: UserService, private commonService: CommonService) {
    this.getUsersHistory();
  }

  ngOnInit() {}

  getUsersHistory() {
    this.userService.getHistoryToday().subscribe((res) => {
      console.log('all users history', res);

      Object.assign(this.users, res);
    });
  }

  add(user) {
    console.log(user);
    this.userService.add(user).subscribe((res) => {
      console.log('Added user: ', res);
      this.users.unshift(res);
    }),
      (err) => {
        console.log('add user error:', err);
      };
  }
}
