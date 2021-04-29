import { Filter } from './../../models/filter';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    // category: new FormGroup({
    //   laptop: new FormControl(false),
    //   phone: new FormControl(false),
    //   tablet: new FormControl(false),
    // })
  });

  filters!: Filter[];

  @ViewChild('mainForm') mainForm!: ElementRef;

  constructor(private databaseService: DatabaseService,
              private renderer: Renderer2) { }

  // checkboxHandler(e: MouseEvent): void {
  //   if (e.target) {
  //     const target = e.target as HTMLInputElement;
  //     const name = target.name;
  //     const arr: FormArray = this.form.get(name) as FormArray;

  //     if (target.checked) {
  //       arr.push(new FormControl(target.value));
  //     } else {
  //       arr.controls.forEach((item, index) => {
  //         if (item.value === target.value) {
  //           arr.removeAt(index);
  //         }
  //       });
  //     }
  //   }
  // }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.filters.forEach((item: any) => {
    //     const div = this.renderer.createElement('div');
    //     // this.renderer.setProperty(div, 'formGroupName', item.name);
    //     div.setAttribute('formGroupName', item.name);
    //     const p = this.renderer.createElement('p');
    //     const title = this.renderer.createText(item.title);
    //     this.renderer.appendChild(p, title);
    //     this.renderer.appendChild(div, p);
  
    //     item.controls.forEach((i: string, index: number) => {
    //       const label = this.renderer.createElement('label');
    //       const input = this.renderer.createElement('input');
    //       this.renderer.setAttribute(input, 'type', item.type);
    //       // this.renderer.setProperty(input, 'formControlName', i);
    //       const labelText = this.renderer.createText(item.labels[index]);
    //       this.renderer.appendChild(label, input);
    //       this.renderer.appendChild(label, labelText);
    //       this.renderer.appendChild(div, label);
    //     });
    //     this.renderer.appendChild(this.mainForm.nativeElement, div);
    //   });

    // },1000)
  }

  ngOnInit(): void {
    this.databaseService.getFilters()
    .pipe(map(data => {

      this.filters = data;

      data.forEach((item: Filter) => {
        this.form.addControl(item.name, new FormGroup({}));

        item.controls.forEach((i: string) => {

          if (this.form.get(item.name) !== null) {
            const g = this.form.get(item.name) as FormGroup;
            g.addControl(i, new FormControl(false));
          }
        });
      });
    }))
    .subscribe();

    this.form
    .valueChanges
    .subscribe(
      val => console.log(val)
    );
  }
}
