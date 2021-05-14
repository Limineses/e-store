import { Router } from '@angular/router';
import { Subscription, TimeInterval } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { User } from './../../models/user';
import { Basket } from './../../models/basket';
import { UserService } from './../../services/user.service';
import { BasketService } from './../../services/basket.service';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  step = 1;
  redirectTime = 5;
  basket!: Basket;
  user!: User;

  saveAddress = false;
  saveCard = false;

  addressForm!: FormGroup;
  cardForm!: FormGroup;

  interval!: number;
  subscriptions!: Subscription;

  constructor(private location: Location,
              private basketService: BasketService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscriptions = this.basketService.getBasket()
      .subscribe(data => this.basket = data);

    const userServiceSubscription = this.userService.getUser()
      .subscribe(data => this.user = data);
    this.subscriptions.add(userServiceSubscription);
  }

  addressFormChanged(form: FormGroup): void {
    this.addressForm = form;
    this.user.address = form.value;
  }

  cardFormChanged(form: FormGroup): void {
    this.cardForm = form;
    this.user.card = form.value;
  }

  back(): void {
    if (this.step === 1) {
      this.location.back();
    } else {
      this.step--;
    }
  }

  next(): void {
    this.step++;
  }

  buy(): void {
    this.step++;
    this.interval = window.setInterval(() => {
      this.redirectTime--;
      if (this.redirectTime === 0) {
        this.router.navigate(['']);
      }
    }, 1000);
    this.userService.setArchive(this.basket.items);
    this.basketService.deleteAll();
    if (this.saveAddress) { this.userService.setAddress(this.addressForm.value); }
    if (this.saveCard) { this.userService.setCard(this.cardForm.value); }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.subscriptions.unsubscribe();
  }
}
