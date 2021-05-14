import { NotificationsService } from './../../services/notifications.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Renderer2, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  constructor(private notificationsService: NotificationsService,
              private renderer: Renderer2) { }

  @ViewChild('container') container!: ElementRef;

  subscriptions!: Subscription;

  ngOnInit(): void {
    this.subscriptions = this.notificationsService.getNotification()
      .subscribe(data => this.renderNotification(data));
  }

  renderNotification(data: string[]): void {
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText(data[1]);
    this.renderer.appendChild(div, text);
    this.renderer.addClass(div, data[0]);

    const container = this.container.nativeElement;
    this.renderer.setStyle(div, 'transform', 'translate(100%, 0)');
    this.renderer.appendChild(container, div);
    this.renderer.setStyle(div, 'transform', 'translate(0, 0');

    setTimeout(() => {
      this.renderer.removeChild(container, div);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
