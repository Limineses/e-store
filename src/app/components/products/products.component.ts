import { FilterService } from './../../services/filter.service';
import { CompareService } from './../../services/compare.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { BasketService } from './../../services/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$!: Product[];

  startIndex!: number;
  endIndex!: number;

  private subscriptions!: Subscription;

  constructor(private basketService: BasketService,
              private compareService: CompareService,
              private filterService: FilterService) { }

  ngOnInit(): void {
    this.subscriptions = this.filterService.getFilteredProducts().subscribe(res => this.products$ = res);
  }

  setPaginationIndex(data: number[]): void {
    this.startIndex = data[0];
    this.endIndex = data[1];
    window.scrollTo({top: 0});
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

  checkBasket(id: number): boolean {
    return this.basketService.checkIncludes(id);
  }

  addInBasket(product: Product): void {
    this.basketService.addItem(product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
