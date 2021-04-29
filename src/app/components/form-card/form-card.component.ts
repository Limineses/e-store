import { Subscription } from 'rxjs';
import { Card } from './../../models/card';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  @Input() card!: Card;
  @Output() formChanged = new EventEmitter();
  private subscriptions!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      number: new FormControl(
          this.card.number ? '**** '.repeat(3) + this.card.number.slice(15, 19) : '',
          [Validators.pattern('[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}'),
          Validators.required,
          this.luhnValidator]),
      holder: new FormControl(this.card.holder, [
          Validators.pattern('[a-zA-Z]{2,15} [a-zA-Z]{2,15}'),
          Validators.required]),
      date: new FormControl(this.card.date, [
          Validators.pattern('[0-9]{2}/[0-9]{2}'),
          Validators.required,
          this.dateValidator]),
      cvv: new FormControl(
          this.card.cvv ? '***' : '',
          [Validators.pattern('[0-9]{3}'),
          Validators.required]),
    });
    
    this.formChanged.emit(this.form);
    this.subscriptions = this.form.valueChanges.subscribe(() => this.formChanged.emit(this.form));
  }

  dateValidator(control: FormControl): {[s: string]: boolean} | null {
    const dateArr: string[] = control.value.split('/');
    if (Number(dateArr[0]) > 12 || Number(dateArr[0]) === 0) {
      return {date: true};
    }
    return null;
  }

  luhnValidator(control: FormControl): {[s: string]: boolean} | null {
    const numberArr: string[] = control.value.replace(/\s/g, '').split('');

    for (let i = 0; i < numberArr.length; i += 2) {
      //@ts-ignore
      const newNum = numberArr[i] * 2;
      //@ts-ignore
      numberArr[i] = newNum > 9 ? newNum - 9 : newNum;
    }

    const res = numberArr.reduce((sum, num) => {
      return sum += Number(num);
    }, 0);
    if (res % 10 !== 0) {
      return {number: true};
    }
    return null;
  }

  numberFormat(): string {
    const numberArr = this.form.value.number.replace(/\s/g, '').split('');
    return numberArr.reduce((str: string, num: string, index: number) => {
      if ((index + 1) % 4 === 0 && index + 1 !== 16) {
        return str += `${num} `;
      } else {
        return str += num;
      }
    }, '');
  }

  holderFormat(): string {
    return this.form.value.holder = this.form.value.holder.toUpperCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
