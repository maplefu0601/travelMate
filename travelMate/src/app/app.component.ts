import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from './services/common.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'travelMate';
  userLoggedin = false;
  userStatus = this.userLoggedin ? 'Logout' : 'Login';
  subscription: Subscription;

  constructor(private commonService: CommonService, private loginService: LoginService) {
    this.subscription = commonService.subj$.subscribe((val) => {
      console.log(val);
      this.userLoggedin = val === 'login' ? true : false;
      this.userStatus = this.userLoggedin ? 'Logout' : 'Login';
    });
  }
  ngOnInit() {
    this.commonService.getLocation();
  }

  logout() {
    console.log('logout');
    this.loginService.logout().subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      },
    );
  }
  changeUserStatus() {
    this.userLoggedin = !this.userLoggedin;
    this.userStatus = this.userLoggedin ? 'Logout' : 'Login';
  }
}
