import { Subscription } from 'rxjs';
import { Address } from './../../models/address';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss']
})
export class FormAddressComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  @Input() address!: Address;
  @Output() formChanged = new EventEmitter();
  private subscriptions!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      country: new FormControl(this.address.country, [
          Validators.pattern('[a-zA-Z]{2,20}(( |-)[a-zA-Z]{2,20}){0,3}'),
          Validators.required]),
      city: new FormControl(this.address.city, [
           Validators.pattern('[a-zA-Z]{2,20}(( |-)[a-zA-Z]{2,20}){0,3}'),
           Validators.required]),
      street: new FormControl(this.address.street, [
           Validators.pattern('[0-9a-zA-Z]{2,20}(( |-)[0-9a-zA-Z]{2,20}){0,3}'),
           Validators.required]),
      house: new FormControl(this.address.house, [
            Validators.pattern('[0-9]{1,5}(/?[0-9a-zA-Z]{1,3})?'),
            Validators.required]),
      flat: new FormControl(this.address.flat, [
            Validators.pattern('([0-9]{1,5}[a-zA-Z]?|\-{1})'),
            Validators.required]),
    });

    this.formChanged.emit(this.form);
    this.subscriptions = this.form.valueChanges.subscribe(() => this.formChanged.emit(this.form));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
