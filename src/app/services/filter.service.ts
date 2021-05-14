import { DatabaseService } from './database.service';
import { Product } from './../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  products!: Product[];
  private products$: ReplaySubject<Product[]> = new ReplaySubject(1);

  constructor(private router: Router,
              private route: ActivatedRoute,
              private db: DatabaseService) {
    // this.db.getProducts().subscribe(data => this.products = data);
    // this.route.queryParams.subscribe(data => this.FilterProducts(data));
    this.db.getProducts().subscribe(data => {
      this.products = data
      this.route.queryParams.subscribe(data2 => this.FilterProducts(data2));
    });
  }

  setQueryParams(data: FormData): void {
    // let res: {[s: string]: string | null} = {page: '1'};
    let res: {[s: string]: string | null} = {};
    for (let [prop, propValue] of Object.entries(data)) {
      let propQueryData = '';

      for(let [key, value] of Object.entries(propValue)) {
        if (value && typeof(value) === 'boolean') {
          propQueryData += propQueryData.length === 0 ? key : `,${key}`;
        }
        if (key === 'start' || key === 'end') {
          if (!propValue.start && !propValue.end) { continue; }
          const n = value ? value : 0;
          propQueryData += propQueryData.length === 0 ? n : `,${n}`;
        }
      }
      res[prop] = propQueryData.length === 0 ? null : propQueryData;
    }
    // console.log(res)
    this.router.navigate(
      [],
      {
        queryParams: res,
        queryParamsHandling: 'merge'
      }
    )
  }

  getFilteredProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  FilterProducts(data: object): void {
    const res: Product[] = [];
    this.products.forEach((product) => {
      if (this.checkPropInProduct(data, product)) {
        res.push(product);
      }
    });
    this.products$.next(res);
  }

  checkPropInProduct(params: object, prod: Product): boolean {
    for (let [key, value] of Object.entries(params)) {

      if (key === 'page') { continue; }

      if(key.indexOf('/') !== -1) {
        const [spec1, spec2] = key.split('/');
        const values = value.split(',');
        //@ts-ignore
        let vll = prod.technicalSpecifications[spec1][spec2];
        let ress = false;
        values.forEach((val: string) => {
          // console.log(vll, val, vll.indexOf(val))
          if (vll.indexOf(val) >= 0) {
            ress = true;
          }
        });
        if (!ress) {
          return false;
        }
      }

      if (!isNaN(parseInt(value))) {
        let [min, max] = value.split(',');
        for (let [prodKey, prodValue] of Object.entries(prod)) {
          if (key === prodKey) {
            if (max == 0 && prodValue < min) {
              return false;
            } else if (max != 0 && (prodValue < min || prodValue > max)) {
              return false;
            }
          }
        }
      } else {
        const values = value.split(',');
        for (let [prodKey, prodValue] of Object.entries(prod)) {
          if (key === prodKey && !values.includes(prodValue)) {
            return false;
          }
        }
      }

    }
    return true;
  }
}
