import { CompareService } from './../../services/compare.service';
import { Product } from 'src/app/models/product';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  @ViewChild('prod') prod!: ElementRef;
  products!: Product[];
  constructor(private compareService: CompareService,
              private location: Location) { }

  ngOnInit(): void {
    this.compareService.getComparedProducts().subscribe(res => this.products = res);
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

  checkMax(spec1: any, spec2: string, val: string): boolean {
    const arr: number[] = [];

    this.products.forEach((item: Product) => {
      for (const [key, value] of Object.entries(item.technicalSpecifications)) {
        if (key === 'dimensions') { continue; }
        if (key === spec1) {
          for (const [key2, value2] of Object.entries(value)) {
            if (key2 === spec2) {
              const str: string = value2 as string;
              arr.push(parseInt(str, 10));
            }
          }
        }
      }
    });
    const valll = parseInt(val, 10);

    const max = Math.max.apply(null, arr);

    if (valll === max) {
      return true;
    } else {
      return false;
    }

  }

}
