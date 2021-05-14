import { NotificationsService } from './../../services/notifications.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Location } from '@angular/common';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  tab = 'login';
  login!: FormGroup;
  registration!: FormGroup;

  constructor(private auth: AngularFireAuth,
              private location: Location,
              private userService: UserService,
              private notificationsService: NotificationsService) { }


  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.registration = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, { validators: this.confirmPassword });
  }

  confirmPassword() {
    return (group: FormGroup) => {
      const password = group.controls.password as FormControl;
      const confirmPassword = group.controls.confirmPassword as FormControl;
      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({notConfirmed: true});
      }
      else {
        return confirmPassword.setErrors(null);
      }
    };
  }

  changeTab(tab: string): void {
    this.tab = tab;
    this.login.reset();
    this.registration.reset();
  }

  loginWithGoogle(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      res => {
        if (res.user?.email) {
          this.userService.addUser(res.user.uid, res.user.email);
        }
      }
    );
  }

  signIn(): void {
    this.auth.signInWithEmailAndPassword(this.login.value.email, this.login.value.password).then(
      res => {
        this.location.back();

      },
      rej => {
        if (rej.code === 'auth/user-not-found') {
          this.notificationsService.pushNotification('warning', 'User not found.');
        }
        if (rej.code === 'auth/wrong-password') {
          this.notificationsService.pushNotification('warning', 'Wrong password.');
        }
        if (rej.code === 'auth/too-many-requests') {
          this.notificationsService.pushNotification('warning', 'Too many requests.');
        }
      }
    );
  }

  signUp(): void {
    this.auth.createUserWithEmailAndPassword(this.registration.value.email, this.registration.value.password).then(
      res => {
        if (res.user?.email) {
          this.userService.addUser(res.user.uid, res.user.email);
        }
        this.location.back();
      },
      rej => {
        if (rej.code === 'auth/email-already-in-use') {
          this.notificationsService.pushNotification('warning', 'Email already in use.')
        }
      }
    );
  }
}
