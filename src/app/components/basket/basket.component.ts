import { BasketItem } from './../../models/basketItem';
import { BasketService } from './../../services/basket.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket!: any;

  constructor( private basketService: BasketService,
               public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getBasket();
  }

  getBasket(): void {
    this.basketService.getBasket().subscribe(res => this.basket  = res);
  }

  increase(prod: any): void {
    this.basketService.increase(prod);
  }

  decrease(prod: any): void {
    this.basketService.decrease(prod);
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

}
