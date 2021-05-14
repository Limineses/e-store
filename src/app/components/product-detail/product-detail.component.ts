import { CompareService } from '../../services/compare.service';
import { BasketService } from '../../services/basket.service';
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('list') list!: ElementRef;
  @ViewChild('images') images!: ElementRef;

  sliderWidth!: number;
  product!: any;

  subscriptions!: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private databaseService: DatabaseService,
              private basketService: BasketService,
              private compareService: CompareService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.subscriptions = this.activatedRoute.params.pipe(
      switchMap(params => this.databaseService.getProduct(Number(params.id))),
      tap(data => this.product = data)
    ).subscribe();
  }

  move(index: number): void {
    this.renderer.setStyle(this.list.nativeElement, 'margin-left', `${-this.sliderWidth * index}px`);
    this.chhangeActiveImage(index);
  }

  toObject(obj: any): object {
    return obj;
  }

  chhangeActiveImage(index: number): void {
    for (let i = 0; i < this.images.nativeElement.children.length; i++) {
      if (i === index) {
        this.renderer.addClass(this.images.nativeElement.children[i], 'active');
      } else {
        this.renderer.removeClass(this.images.nativeElement.children[i], 'active');
      }
    }
  }

  checkBasket(id: number): boolean {
    return this.basketService.checkIncludes(id);
  }

  addInBasket(product: Product): void {
    this.basketService.addItem(product);
  }

  checkCompare(id: number): boolean {
    return this.compareService.checkIncludes(id);
  }

  addInCompare(prod: Product): void {
    this.compareService.addItem(prod);
  }

  deleteFromCompare(id: number): void {
    this.compareService.deleteItem(id);
  }

  ngAfterViewInit(): void {
    const slider = this.renderer.parentNode(this.list.nativeElement);
    this.sliderWidth = slider.offsetWidth;
    window.addEventListener('resize', () => this.sliderWidth = slider.offsetWidth);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
