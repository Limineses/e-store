import { ArchiveItem } from './../models/archiveItem';
import { BasketItem } from './../models/basketItem';
import { Card } from './../models/card';
import { Address } from './../models/address';
import { User } from './../models/user';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: ReplaySubject<User> = new ReplaySubject(1);
  userId!: string;
  user!: User;

  constructor(private db: DatabaseService,
              private auth: AngularFireAuth) {
    //@ts-ignore
    // this.auth.user.subscribe(data => this.userId = data.uid);
    this.setUserId();
  }

  getUser(): Observable<any>{
    // return this.db.getUser(this.userId);
    return this.user$.asObservable();
  }

  setBasket(userId: string, basketId: string): void {
    this.db.setBasket(userId, basketId);
  }

  setArchive(items: BasketItem[]): void {
    const res: ArchiveItem[] = this.user.archive ? this.user.archive : [];
    items.reverse().forEach(item => {
      const obj: ArchiveItem = {
        date: Date.now(),
        id: item.id,
        quantity: item.quantity,
        model: item.model,
        price: item.price,
        description: item.description,
        image: item.image,
      };
      res.push(obj);
    });
    this.db.setArchive(this.userId, res);
  }

  setUserId() {
    //@ts-ignore
    // this.auth.user.subscribe(data => this.userId = data.uid);
    this.auth.user.subscribe(data => {
      if (data) {
        this.userId = data.uid;
        const res = this.db.getUser(this.userId);
        res.subscribe(n => {
          this.user$.next(n);
          this.user = n;
        });
      }
    });
  }

  setAddress(address: Address): void {
    this.db.setAddress(address, this.userId);
  }

  setCard(card: Card): void {
    card.holder = card.holder.toUpperCase();
    this.db.setCard(card, this.userId);
  }

  addUser(userId: string, userEmail: string): void {
    const user = {
      id: userId,
      email: userEmail,
      basket: '',
      address: {
        country: '',
        city: '',
        street: '',
        house: '',
        flat: '',
      },
      card: {
        number: '',
        holder: '',
        date: '',
        cvv: '',
      },
      archive: [],
    };

    this.db.addUser(user);
  }
}
