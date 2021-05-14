import { Subscription } from 'rxjs';
import { CompareService } from './../../services/compare.service';
import { Product } from 'src/app/models/product';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit, OnDestroy {

  @ViewChild('prod') prod!: ElementRef;

  products!: Product[];

  subscriptions!: Subscription;

  constructor(private compareService: CompareService,
              private location: Location) { }

  ngOnInit(): void {
    this.subscriptions = this.compareService.getComparedProducts().subscribe(data => this.products = data);
    window.scrollTo({top: 0});
  }

  allSpecs(): object {
    const res = {};
    this.products.forEach(prod => {
      Object.assign(res, prod.technicalSpecifications);
    });
    return res;
  }

  goBack(): void {
    this.location.back();
  }

  deleteAll(): void {
    this.compareService.deleteAll();
    this.goBack();
  }

  deleteItem(id: number): void {
    this.compareService.deleteItem(id);
  }

  toObject(obj: any): object {
    return obj;
  }
  //@ts-ignore
  // toObject(index: number, str: string): object {
  //   for ( const [key, value] of Object.entries(this.products[index])) {
  //     if (key === str) {
  //       return value;
  //     }
  //   }
  //   return {};
  // }

  ggg(index: number, key1: string, key2: string): string {
    for ( const [key, value] of Object.entries(this.products[index].technicalSpecifications)) {
      if (key === key1) {
        for (const [key22, value2] of Object.entries(value)) {
          if (key22 === key2) {
            return String(value2);
          }
        }
      }
    }
    return '-';
  }

  checkMax(spec1: any, spec2: string, val: string): boolean {
    const arr: number[] = [];

    this.products.forEach((item: Product) => {
      for (const [key, value] of Object.entries(item.technicalSpecifications)) {
        if (key === 'construction') { continue; }
        if (key === 'dimensions') { continue; }
        if (key === spec1) {
          for (const [key2, value2] of Object.entries(value)) {
            if (key2 === spec2) {
              const str: string = value2 as string;
              if (spec2 === 'resolution') {
                const resol = str.split('x');
                const nn: number = Number(resol[0]) * Number(resol[1]);
                arr.push(nn);
              } else {
                arr.push(parseFloat(str));
              }
            }
          }
        }
      }
    });

    let valll: number;

    if (spec2 === 'resolution') {
      const str: string = val as string;
      const resol = str.split('x');
      const nn: number = Number(resol[0]) * Number(resol[1]);
      valll = nn;
    } else {
      valll = parseFloat(val);
    }

    const max = Math.max.apply(null, arr);

    let repeat = false;
    arr.forEach(i => {
      if (i != valll) {
        repeat = true;
      }
    });

    if(arr.length === 1 && val !== '-') {
      return true;
    }

    if (valll === max && repeat) {
      return true;
    } else {
      return false;
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
