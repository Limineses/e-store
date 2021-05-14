import { Component, Input, OnInit, AfterViewInit, Renderer2, ViewChild, ElementRef, DoCheck } from '@angular/core';

@Component({
  selector: 'app-view-rating',
  templateUrl: './view-rating.component.html',
  styleUrls: ['./view-rating.component.scss']
})
export class ViewRatingComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() rating!: number;
  @ViewChild('fill') fill!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.fill) { this.setWidth(); }
  }

  ngAfterViewInit(): void {
    this.setWidth();
  }

  setWidth(): void {
    const width = Math.round((this.rating / 5) * 100);
    this.renderer.setStyle(this.fill.nativeElement, 'width', `${width}%`);
  }

}
