import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { EventsComponent } from './components/events/events.component';
import { GroupsComponent } from './components/groups/groups.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';

import { MessageService } from './services/message.service';
import { EventService } from './services/event.service';
import { CommonService } from './services/common.service';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { GroupService } from './services/group.service';
import { RegisterComponent } from './components/register/register.component';
import { JwtHandleService } from './services/jwt-handle.service';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    EventsComponent,
    GroupsComponent,
    HomeComponent,
    MessagesComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [
    MessageService,
    EventService,
    CommonService,
    UserService,
    LoginService,
    SocketService,
    GroupService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtHandleService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
