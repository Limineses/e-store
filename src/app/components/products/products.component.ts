import { CompareService } from './../../services/compare.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DatabaseService } from './../../services/database.service';
import { BasketService } from './../../services/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$!: Product[];
  page = 1;
  countOnPage = 7;

  category?: string;
  private querySubscription?: Subscription;

  constructor(private route: ActivatedRoute,
              private databaseService: DatabaseService,
              private basketService: BasketService,
              private router: Router,
              private compareService: CompareService) { }

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
          this.category = queryParam['category'];
          this.page = queryParam['page'];
      }
    );
    this.getProducts();
  }

  getProducts(): void {
    this.databaseService.getProducts().subscribe(res => this.products$ = res);
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

  pagination(): Product[] {
    const endIndex = this.page * this.countOnPage;
    const startIndex = endIndex - this.countOnPage;
    const res =  this.products$.filter((prod: Product, i: number) => {
      if (i < endIndex && i >= startIndex) {
        return prod;
      } else {
        return;
      }
    });
    return res;
  }

  pages(): number[] {
    const n = Math.ceil(this.products$.length / this.countOnPage);
    const arr = new Array(n);
    return arr;
  }

  setPage(n: number): void {
    if (n == this.page) {return;}
    this.router.navigate(
      [],
      {
        queryParams: {
          "page" : n
        }
      }
    );
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
