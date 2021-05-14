import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SharedModule } from './../shared/shared.module';

import { ProductDetailComponent } from './product-detail.component';

const routes: Routes = [
  { path: '', component: ProductDetailComponent, }
];

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireStorageModule,
    SharedModule
  ]
})
export class ProductDetailModule { }
