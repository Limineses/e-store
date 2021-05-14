import { User } from './../models/user';
import { map, take, takeUntil } from 'rxjs/operators';
import { UserService } from './user.service';
import { Product } from './../models/product';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, pipe, Subscription, Subject } from 'rxjs';

import { Basket } from './../models/basket';
import { BasketItem } from './../models/basketItem';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket!: Basket | null;
  user!: User;

  subscriptions!: Subscription;

  private basket$: ReplaySubject<Basket | null> = new ReplaySubject(1);

  constructor( private db: DatabaseService,
               private auth: AngularFireAuth,
               private userService: UserService) {
    this.getBasketForService();
    // this.auth.user.subscribe((user) => this.user = user?.uid);
    this.userService.getUser().subscribe(data => this.checkUserBasket(data));
  }

  goOut(): void {
    // this.subscriptions.unsubscribe();
    localStorage.removeItem('EStore-basket');
    this.basket$.next(null);
    this.basket = null;
    // this.getBasketForService();
  }

  checkUserBasket(user: User): void {
    if (user.basket) {
      localStorage.setItem('EStore-basket', user.basket);
      this.getBasketForService();
    } else {
      const id = this.basketId();
      if (id !== null) {
        this.userService.setBasket(user.id, id);
      }
    }

    // else if (!user.basket && this.basketId()) {
    //   //@ts-ignore
    //   this.userService.setBasket(user.id, this.basketId());
    // }
  }

  basketId(): string | null {
    return localStorage.getItem('EStore-basket');
  }

  // asdf(): Observable {
  //   return this.products$.asObservable();
  // }

  getBasketForService(): void {
    const id = this.basketId();
    if (id !== null) {
      this.db.getBasket(id).subscribe(data => {
        this.basket$.next(data);
        this.basket = data;
      });
    }

    // this.subscriptions = this.getBasket().subscribe(data => this.basket$.next(data));
  }

  // getBasket(): Observable<any> {
  //   const id = this.basketId();
  //   if (id !== null) {
  //     return this.db.getBasket(id).pipe(takeUntil(this.notifier));
  //   } else {
  //     return of([]);
  //   }
  // }
  getBasket(): Observable<any> {
    // const id = this.basketId();
    // if (id !== null) {
    //   return this.db.getBasket(id);
    // } else {
    //   return of([]);
    // }
    return this.basket$.asObservable();
  }

  increase(item: BasketItem): void {
    if (this.basket) {
      this.basket.items.forEach((n: BasketItem) => {
        if (n.id === item.id) {
          n.quantity++;
        }
      });
      this.refreshBasket();
    }
  }

  decrease(item: any): void {
    if (this.basket) {
      this.basket.items.forEach((n: any) => {
        if (n.id === item.id) {
          n.quantity--;
        }
      });
      this.refreshBasket();
    }
  }

  addItem(product: Product): void {
    const id = this.basketId();
    if (!id) {
      this.createBasket(product);
    } else if (this.basket){
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
    const id = Date.now();
    const basket: Basket = {
      id : String(id),
      count : 1,
      totalPrice: product.price,
      items: [this.createBasketItem(product)]
    };
    localStorage.setItem('EStore-basket', String(id));
    // if (this.user.basket === '') {
    //   this.userService.setBasket(this.user.id, String(id));
    // }
    this.db.addBasket(basket, id);
    setTimeout(() => this.getBasketForService() , 500)
    
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
    if (this.basket) {
      this.basket.items = this.basket.items.filter((i: any) => {
        return i.id !== id;
      });
      this.refreshBasket();
    }
  }

  deleteAll(): void {
    if (this.basket) {
      this.basket.items = [];
      this.refreshBasket();
    }
  }

  refreshBasket(): void {
    if (this.basket) {
      this.setTotalCount();
      this.setTotalPrice();
      this.db.refreshBasket(this.basket);
    }
  }

  setTotalPrice(): void {
    if (this.basket) {
      this.basket.totalPrice = this.basket.items.reduce((sum: number, item: BasketItem) => {
        return sum + (item.price * item.quantity);
      }, 0);
    }
  }

  setTotalCount(): void {
    if (this.basket) {
      this.basket.count = this.basket.items.reduce((count: number, item: BasketItem) => {
      return count + item.quantity;
      }, 0);
    }
  }

  checkIncludes(id: number): boolean {
    let res = false;
    if (this.basket?.items) {
      this.basket.items.forEach((item: BasketItem) => {
        if (item.id === id) {
          res = true;
        }
      });
    }
    return res;
  }
}
