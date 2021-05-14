import { BasketItem } from './../../models/basketItem';
import { BasketService } from './../../services/basket.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  basketItemsCount = 0;

  constructor(public auth: AngularFireAuth,
              private router: Router,
              private basketService: BasketService) { }


  ngOnInit(): void {
    this.basketService.getBasket().subscribe(data => {
      if (data && data.items && data.items) {
        this.basketItemsCount = data.items.reduce((sum: number, item: BasketItem) => {
          return sum + item.quantity;
        }, 0);
      } else {
        this.basketItemsCount = 0;
      }
    });
  }

  navigate(params: string | null): void {
    this.router.navigate(
      ['/products'],
      {
        queryParams: {category: params}
      }
    );
  }

  logout(): void {
    this.auth.signOut().then(
      res => {
        this.basketService.goOut();
      }
    );
    if (this.router.url === '/settings' || this.router.url === '/checkout') {
      this.router.navigate(['']);
    }
  }
}
