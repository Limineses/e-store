import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AngularFireAuth,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.signOut();
    if (this.router.url === '/settings' || this.router.url === '/checkout') {
      this.router.navigate(['']);
    }
  }
}
