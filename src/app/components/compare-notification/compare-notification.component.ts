import { Router } from '@angular/router';
import { CompareService } from './../../services/compare.service';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-compare-notification',
  templateUrl: './compare-notification.component.html',
  styleUrls: ['./compare-notification.component.scss']
})
export class CompareNotificationComponent implements OnInit {
  count = 0;
  @ViewChild('confirm') confirm!: ElementRef

  constructor(private renderer: Renderer2,
              private compareService: CompareService,
              private router: Router) { }

  ngOnInit(): void {
    this.compareService.getComparedProducts().subscribe(res => this.count = res.length);
  }

  toCompare(): void {
    if (this.count < 2) { return; }
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

}
