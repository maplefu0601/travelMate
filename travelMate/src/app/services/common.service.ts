import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient, private router: Router) {}
  private sub = new Subject();
  subj$ = this.sub.asObservable();

  currentLocation = {};

  send(value: string) {
    this.sub.next(value);
  }

  setCurrentUser(user) {
    localStorage.setItem('userInfo', user);
  }

  getCurrentUser() {
    return localStorage.getItem('userInfo');
  }

  loggedIn(user) {
    this.setCurrentUser(user.username || user.userObj.username);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.send('login');
  }

  logout() {
    this.setCurrentUser('');
    localStorage.removeItem('currentUser');
    this.send('logout');
    this.goto('login');
  }

  isLoggedIn() {
    let user = this.getCurrentUser();
    console.log('isLoggedIn: ', user);
    return user !== undefined && user !== '' && user !== null;
  }

  isOwner(name) {
    let user = this.getCurrentUser();
    // console.log(user);
    return name === user;
  }

  getLocation() {
    return (
      this.http
        .get('https://ipinfo.io/json')
        .pipe(map((response) => response || {}))
        .subscribe((res) => {
          console.log('currecnt location: ', res);
          this.currentLocation = res;
        }),
      (err) => {
        console.log('add user error:', err);
      }
    );
  }

  goto(name) {
    this.router.navigateByUrl('/' + name);
  }
}
