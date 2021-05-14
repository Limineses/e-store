import { NotificationsService } from './../../../services/notifications.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CompareService } from '../../../services/compare.service';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-compare-notification',
  templateUrl: './compare-notification.component.html',
  styleUrls: ['./compare-notification.component.scss']
})
export class CompareNotificationComponent implements OnInit, OnDestroy {
  count = 0;
  @ViewChild('confirm') confirm!: ElementRef;

  subscriptions!: Subscription;
  constructor(private renderer: Renderer2,
              private compareService: CompareService,
              private router: Router,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.subscriptions = this.compareService.getComparedProducts().subscribe(res => this.count = res.length);
  }

  toCompare(): void {
    if (this.count < 2) {
      this.notificationsService.pushNotification('warning', 'Select minimum 2 products.');
      return;
    }
    this.router.navigate(['/compare']);
  }

  deleteAll(): void {
    this.renderer.setStyle(this.confirm.nativeElement, 'left', 0);
    setTimeout(() => {
      if (this.confirm) {
        this.renderer.setStyle(this.confirm.nativeElement, 'left', '100%');
      }
    }, 3000);
  }

  confirmDelete(): void {
    this.compareService.deleteAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
