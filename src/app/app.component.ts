import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'epa-ui';
  logado: boolean = false;
  currentUser: User;

  constructor() {
    //this.logout();
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

}
