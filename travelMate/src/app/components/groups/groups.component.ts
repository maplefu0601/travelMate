import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GroupService } from '../../services/group.service';
import { CommonService } from '../../services/common.service';
import { SocketService } from '../../services/socket.service';
import { MessageObj } from '../../messageObj';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groupForm: FormGroup;
  groups = [];
  name = 'Group';
  showNewGroup = false;
  currentUser = '';

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private commonService: CommonService,
    private socketService: SocketService,
  ) {
    this.currentUser = this.commonService.getCurrentUser();
    this.getGroups();
  }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start: ['', Validators.required],
      destination: ['', [Validators.required]],
    });

    this.socketService.onMessage().subscribe((message: MessageObj) => {
      console.log('Group:', message);
      let msg = message.name.split('_');
      if (msg[0] === this.name) {
        let type = msg[1];
        switch (type) {
          case 'new':
            console.log('added group:', message.message);
            this.groups.unshift(message.message);
            break;
          case 'delete':
          case 'join':
          case 'quit':
            this.getGroups();
            break;
          default:
            break;
        }
      }
    });
  }

  showCreateGroup(show) {
    this.showNewGroup = show;
  }

  getGroups() {
    this.groupService.getAll().subscribe((res) => {
      console.log('all events', res);

      Object.assign(this.groups, res);
    });
  }

  createGroup() {
    if (this.groupForm.invalid) {
      return;
    }

    this.showCreateGroup(false);

    let group = this.groupForm.value;
    console.log('grouop:', group);
    this.groupService.add(group).subscribe((res) => {
      this.socketService.send('Group', 'new', res);
    }),
      (err) => {
        console.log('add group error:', err);
      };
  }

  delete(group) {
    console.log('deleting ', group);
    this.groupService.delete(group.id).subscribe((res) => {
      console.log('removed group: ', res);
      this.groups.splice(this.groups.findIndex((e) => e.id === group.id), 1);
    }),
      (err) => {
        console.log('remove group error:', err);
      };
  }

  isMember(group) {
    return group.members.indexOf(this.currentUser) !== -1;
  }

  join(group) {
    console.log('joining group: ', group.name);
    this.groupService.join(group.id, this.currentUser).subscribe((res) => {
      this.getGroups();
      group.user = this.currentUser;
      this.socketService.send('Group', 'join', group);
    });
  }

  quit(group) {
    console.log('quit group: ', group.name);
    this.groupService.quit(group.id, this.currentUser).subscribe((res) => {
      this.getGroups();
      group.user = this.currentUser;
      this.socketService.send('Group', 'quit', group);
    });
  }
}
