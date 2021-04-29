import { ArchiveItem } from './../models/archiveItem';
import { Card } from './../models/card';
import { Address } from './../models/address';
import { User } from './../models/user';
import { Filter } from './../models/filter';
import { BasketItem } from './../models/basketItem';
import { Basket } from './../models/basket';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Product } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getProducts(): Observable<Product[]> {
    return this.db.list<Product>('/products').valueChanges();
  }

  getProduct(id: number): Observable<any> {
    return this.db.object<Product>(`products/${id}`).valueChanges();
  }

  getFilters(): Observable<Filter[]> {
    return this.db.list<Filter>('/filters').valueChanges();
  }

  getBasket(id: string): Observable<any> {
    return this.db.object<Basket>(`baskets/${id}`).valueChanges();
  }

  addBasket(basket: Basket): void {
    this.db.list<Basket>('/baskets').push(basket).then(data => {
      const key = data.key;
      if (key) {
        this.db.object<Basket>(`/baskets/${key}`).update({id: key});
        localStorage.setItem('EStore-basket', key);
      }
    });
  }

  refreshBasket(basket: Basket): void {
    this.db.object<Basket>(`baskets/${basket.id}`).set(basket);
  }

  setArchive(userId: string, archive: ArchiveItem[]): void {
    this.db.object<ArchiveItem[]>(`users/${userId}/archive`).set(archive);
  }

  addUser(user: User): void {
    this.db.object<User>(`/users/${user.id}`).set(user);
  }

  setAddress(address: Address, userId: string): void {
    this.db.object<Address>(`/users/${userId}/address`).set(address);
  }

  setCard(card: Card, userId: string): void {
    this.db.object<Card>(`/users/${userId}/card`).set(card);
  }

  getUser(id: string): Observable<any> {
    return this.db.object<User>(`/users/${id}`).valueChanges();
  }

}
