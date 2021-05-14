import { Subscription } from 'rxjs';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  user!: User;
  tab = 'address';
  addressForm!: FormGroup;
  cardForm!: FormGroup;

  subscriptions!: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscriptions = this.userService.getUser().subscribe(data => this.user = data);
  }

  addressFormChanged(form: FormGroup): void {
    this.addressForm = form;
  }

  setAddress(): void {
    this.userService.setAddress(this.addressForm?.value);
    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
    this.addressForm.updateValueAndValidity();
  }

  cardFormChanged(form: FormGroup): void {
    this.cardForm = form;
  }

  setCard(): void {
    this.userService.setCard(this.cardForm?.value);
    this.cardForm.markAsPristine();
    this.cardForm.markAsUntouched();
    this.cardForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
