import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SearchService } from './../../services/search.service';
import { Product } from './../../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products$?: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((str: string) => this.searchService.search(str))
    );
  }

  search(str: string): void {
    this.searchTerms.next(str);
  }

  clear(input: HTMLInputElement): void {
    input.value = '';
    this.search('');
  }
}
