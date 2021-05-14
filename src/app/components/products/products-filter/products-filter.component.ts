import { FilterService } from '../../../services/filter.service';
import { Subscription } from 'rxjs';
import { Filter } from '../../../models/filter';
import { DatabaseService } from '../../../services/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  filters!: Filter[];

  flag = false;

  private subscriptions!: Subscription;

  constructor(private databaseService: DatabaseService,
              private filterService: FilterService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptions = this.databaseService.getFilters()
    .pipe(
      map(data => {
      this.filters = data;
      data.forEach((item: Filter) => {

        this.form.addControl(item.name, new FormGroup({}));

        item.controls.forEach((i: string) => {
          if (this.form.get(item.name) !== null) {
            const g = this.form.get(item.name) as FormGroup;
            g.addControl(i, new FormControl());
          }
        });
      });
    }))
    .subscribe(() => {

      const routeSubscription = this.route.queryParams.subscribe(data => {
        this.form.reset();
        this.setFormValues(data);
      });
    })

    const formSubscription = this.form.valueChanges.subscribe(value => {
      this.filterService.setQueryParams(value);
    });
    this.subscriptions.add(formSubscription);

  }

  setFormValues(params: object): void {
    for (let [key, value] of Object.entries(params)) {
      if (key === 'page') { continue; }
      const values = value.split(',');
      if (!isNaN(parseInt(value))) {
        const group = this.form.controls[key] as FormGroup;
        const start = group.controls.start as FormControl;
        const end = group.controls.end as FormControl;
        start.setValue(values[0]);
        end.setValue(values[1]);
      } else {
        for(let [formKey, formValue] of Object.entries(this.form.value[key])) {
          if (values.includes(formKey)) {
            const group = this.form.controls[key] as FormGroup;
            const control = group.controls[formKey] as FormControl;
            control.setValue(true);
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
