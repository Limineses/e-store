import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  tab = 'login';
  login = {
    email : '',
    password : ''
  };
  registration = {
    email : '',
    password : ''
  };
  constructor(private auth: AngularFireAuth,
              private location: Location,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.auth.signInWithEmailAndPassword(this.login.email, this.login.password).then(
      res => {
        this.clearAndBack();
        this.userService.setUserId();
      },
      rej => {
        alert(rej.message);
      }
    );
  }

  signUp(): void {
    this.auth.createUserWithEmailAndPassword(this.registration.email, this.registration.password).then(
      res => {
        if (res.user) {
          //@ts-ignore
          this.userService.addUser(res.user.uid, res.user.email);
        }
        this.clearAndBack();
        this.userService.setUserId();
      },
      rej => {
        alert(rej.message);
      }
    );
  }

  clearAndBack(): void {
    this.login.email = '';
    this.login.password = '';
    this.registration.email = '';
    this.registration.password = '';
    this.location.back();
  }

}
