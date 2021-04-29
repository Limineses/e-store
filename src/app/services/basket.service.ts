import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Basket } from './../models/basket';
import { BasketItem } from './../models/basketItem';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket!: Basket;

  constructor( private db: DatabaseService) { 
    this.getBasket().subscribe(res => this.basket = res);
  }

  basketId(): string | null {
    return localStorage.getItem('EStore-basket');
  }

  increase(item: BasketItem): void {
    this.basket.items.forEach((n: BasketItem) => {
      if (n.id === item.id) {
        n.quantity++;
      }
    });
    this.refreshBasket();
  }

  getBasket(): Observable<any> {
    const id = this.basketId();
    if (id !== null) {
      return this.db.getBasket(id);
    } else {
      return of([]);
    }
  }

  decrease(item: any): void {
    this.basket.items.forEach((n: any) => {
      if (n.id === item.id) {
        if (n.quantity === 1) {
          this.basket.items = this.basket.items.filter((i: any) => {
            return i.id !== item.id;
          });
        } else {
          n.quantity--;
        }
      }
    });
    this.refreshBasket();
  }

  addItem(product: Product): void {
    const id = this.basketId();
    if (!id) {
      this.createBasket(product);
    } else {
      if (!this.basket.items) {
        this.basket.items = [this.createBasketItem(product)];
      } else {
        const find = this.basket.items.find((item: BasketItem) => item.id === product.id);
        if (find) {
          this.basket.items = this.basket.items.filter((item: BasketItem) => item.id !== product.id);
        } else {
          this.basket.items.push(this.createBasketItem(product));
        }
      }
      this.refreshBasket();
    }
  }

  createBasket(product: Product): void {
    const basket: Basket = {
      id : '',
      count : 1,
      totalPrice: product.price,
      items: [this.createBasketItem(product)]
    };
    this.db.addBasket(basket);
  }

  createBasketItem(product: Product): BasketItem {
    return {
      quantity: 1,
      id: product.id,
      model: product.model,
      price: product.price,
      description: product.description,
      image: product.images[0]
    };
  }

  deleteItem(id: number): void {
    this.basket.items = this.basket.items.filter((i: any) => {
      return i.id !== id;
    });
    this.refreshBasket();
  }

  deleteAll(): void {
    this.basket.items = [];
    this.refreshBasket();
  }

  refreshBasket(): void {
    this.setTotalCount();
    this.setTotalPrice();
    this.db.refreshBasket(this.basket);
  }

  setTotalPrice(): void {
    this.basket.totalPrice = this.basket.items.reduce((sum: number, item: BasketItem) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  setTotalCount(): void {
    this.basket.count = this.basket.items.reduce((count: number, item: BasketItem) => {
      return count + item.quantity;
    }, 0);
  }

  checkIncludes(id: number): boolean {
    let res = false;
    if (this.basket.items) {
      this.basket.items.forEach((item: BasketItem) => {
        if (item.id === id) {
          res = true;
        }
      });
    }
    return res;
  }
}
