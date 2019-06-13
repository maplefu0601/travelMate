import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private commonServie: CommonService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let obj = {
      username: this.f.username.value,
      password: this.f.password.value,
      name: this.f.username.value,
    };
    this.loginService.login(obj).subscribe(
      (res) => {
        this.commonServie.loggedIn(res);
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.loading = false;
      },
    );
  }

  logout() {
    this.loginService.logout();
  }
}
