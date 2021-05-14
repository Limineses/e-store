import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {
  interval = true;
  sliderWidth!: number;
  nowSlide = 0;
  slidesCount!: number;

  @ViewChild('dots') dots!: ElementRef;
  @ViewChild('list') list!: ElementRef;

  constructor(public renderer: Renderer2) { }

  move(num: number): void {
    if (this.nowSlide + num > this.slidesCount - 1) {
      this.nowSlide = 0;
    } else if (this.nowSlide + num < 0) {
      this.nowSlide = this.slidesCount - 1;
    } else {
      this.nowSlide += num;
    }
    this.renderer.setStyle(this.list.nativeElement, 'margin-left', `${this.nowSlide * -this.sliderWidth}px`);
    this.changeDots();
  }

  dotsHandler(index: number): void {
    this.nowSlide = index;
    this.renderer.setStyle(this.list.nativeElement, 'margin-left', `${this.nowSlide * -this.sliderWidth}px`);
    this.changeDots();
  }

  changeDots(): void {
    for (let i = 0; i < this.dots.nativeElement.children.length; i++ ) {
      if (i === this.nowSlide) {
        this.renderer.addClass(this.dots.nativeElement.children[i], 'active');
      } else {
        this.renderer.removeClass(this.dots.nativeElement.children[i], 'active');
      }
    }
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.interval) {
        this.move(1);
      }
    }, 3000);
  }

  ngAfterViewInit(): void {
    const slider = this.renderer.parentNode(this.list.nativeElement);
    this.sliderWidth = slider.offsetWidth;
    this.slidesCount = this.list.nativeElement.children.length;

    slider.addEventListener('mouseover', () => this.interval = false);
    slider.addEventListener('mouseout', () => this.interval = true);

    window.addEventListener('resize', () => this.sliderWidth = slider.offsetWidth);

    for (let i = 0; i < this.dots.nativeElement.children.length; i++ ) {
      this.dots.nativeElement.children[i].addEventListener('click', () => {
        this.dotsHandler(i);
      });
    }
  }
}
