import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notification$: Subject<string[]> = new Subject();

  constructor() { }

  pushNotification(type: string, message: string): void {  // types: warning, notify
    this.notification$.next([type, message]);
  }

  getNotification(): Observable<string[]> {
    return this.notification$.asObservable();
  }
}
