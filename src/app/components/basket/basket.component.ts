import { Subscription } from 'rxjs';
import { NotificationsService } from './../../services/notifications.service';
import { BasketItem } from './../../models/basketItem';
import { BasketService } from './../../services/basket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {
  basket!: any;

  subscriptions!: Subscription;
  constructor( private basketService: BasketService,
               public auth: AngularFireAuth,
               private notificationsService: NotificationsService,
               private router: Router) { }

  ngOnInit(): void {
    this.subscriptions = this.basketService.getBasket().subscribe(data => this.basket = data);
  }

  checkDisabled(data: MouseEvent) {
    const el = data.target as HTMLElement;

    if (el.classList.contains('disabled')) {
      this.notificationsService.pushNotification('warning', 'You must be authorized.');
    } else {
      this.router.navigate(['/checkout']);
    }
  }

  increase(prod: any): void {
    if (prod.quantity === 10) {
      this.notificationsService.pushNotification('warning', 'Maximum 10 products.');
    } else {
      this.basketService.increase(prod);
    }
  }

  decrease(prod: any): void {
    if (prod.quantity === 1) {
      this.notificationsService.pushNotification('warning', 'Minimum 1 product.');
    } else {
      this.basketService.decrease(prod);
    }
  }

  deleteItem(id: number): void {
    this.basketService.deleteItem(id);
  }

  deleteAll(): void {
    this.basketService.deleteAll();
  }

  trackById(index: number, item: BasketItem) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
