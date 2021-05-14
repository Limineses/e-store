import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {

  page = 1;
  max!: number;
  @Input() length!: number;
  @Input() around!: number;
  @Input() countOnPage!: number;
  @Output() pageChanged = new EventEmitter();

  subscriptions!: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnChanges(): void {
    this.max = Math.ceil(this.length / this.countOnPage);
    if (Math.ceil(this.length / this.countOnPage) < this.page) {
      this.router.navigate([],
        {
          queryParams: {page : 1},
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  ngOnInit(): void {
    this.subscriptions = this.route.queryParams.subscribe(params => {
      this.page = params.page ? Number(params.page) : 1;

      this.returnIndexes();
    });
  }

  returnIndexes(): void {
    const endIndex = this.page * this.countOnPage;
    const startIndex = endIndex - this.countOnPage;
    this.pageChanged.emit([startIndex, endIndex]);
  }

  pages(): number[] {
    const res: number[] = [];
    if (this.max <= this.around * 2 + 1) {
      for (let i = 1; i <= this.max; i++) {
        res.push(i);
      }
    } else if (this.page <= 2 + this.around) {
      for (let i = 1; i <= (this.around * 2) + 1; i++) {
        res.push(i);
      }
    } else if (this.page >= this.max - (this.around + 1)) {
      for (let i = this.max - this.around * 2; i <= this.max; i++) {
        res.push(i);
      }
    } else {
      for (let i = this.page - this.around; i <= this.page + this.around; i++) {
        res.push(i);
      }
    }
    return res;
  }

  setPage(num: number): void {
    this.router.navigate([],
      {
        queryParams: {page : num},
        queryParamsHandling: 'merge'
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
