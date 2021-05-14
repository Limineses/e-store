import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SharedModule } from './../shared/shared.module';

import { ProductsComponent } from './products.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    SharedModule
  ]
})
export class ProductsModule { }
