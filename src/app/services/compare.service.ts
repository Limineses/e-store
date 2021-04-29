import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private products$: ReplaySubject<Product[]> = new ReplaySubject(1);
  products: Product[] = [];
  constructor() {
    this.onStart();
  }

  getComparedProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  onStart(): void {
    if (localStorage.getItem('EStore-compare')) {
      this.products = JSON.parse(localStorage.getItem('EStore-compare') || '');
    }
    this.subjNext();
  }

  subjNext(): void {
    this.products$.next(this.products);
  }

  addItem(prod: Product): void {
    if (!this.checkCategory(prod) || this.products.length === 4) { return; }
    this.products.push(prod);
    const val = JSON.stringify(this.products); /////////////repeat
    localStorage.setItem('EStore-compare', val);
    this.subjNext();
  }

  deleteItem(id: number): void {
    this.products = this.products.filter((item: Product) => {
      return item.id !== id;
    });
    const val = JSON.stringify(this.products); /////////////repeat
    localStorage.setItem('EStore-compare', val);
    this.subjNext();
  }

  deleteAll(): void {
    this.products = [];
    localStorage.removeItem('EStore-compare');
    this.subjNext();
  }

  checkCategory(prod: Product): boolean {
    let res = true;
    if (this.products.length !== 0) {
      this.products.forEach((item: Product) => {
        if (item.category !== prod.category) {
          res =  false;
        }
      });
    }
    return res;
  }

  checkIncludes(id: number): boolean {
    let res = false;
    if (this.products) {
      this.products.forEach((prod: Product) => {
        if (prod.id === id) {
          res = true;
        }
      });
    }
    return res;
  }
}
