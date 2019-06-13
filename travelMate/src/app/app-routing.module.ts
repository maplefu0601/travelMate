import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { EventsComponent } from './components/events/events.component';
import { GroupsComponent } from './components/groups/groups.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'groups',
    component: GroupsComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
