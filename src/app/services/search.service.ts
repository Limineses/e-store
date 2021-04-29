import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private db: AngularFireDatabase) { }

  search(str: string): Observable<Product[]> {
    if (!str.trim()) { return of([]); }

    return this.db.list<Product>(`/products`).valueChanges().pipe(map(data => {
      return data.filter(product => {
        if (product.model.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) === -1) { return; }

        const indexIn =  product.model.toLocaleLowerCase().indexOf(str.toLocaleLowerCase());
        const indexOut = indexIn + str.trim().length;

        return product.model = product.model.split('').reduce((sum, item, index) => {
          if (index === indexIn) {
            return sum += `<b>${item}`;
          } else if (index === indexOut) {
            return sum += `</b>${item}`;
          } else {
            return sum += item;
          }
        }, '');
      });
    }));
  }
}
