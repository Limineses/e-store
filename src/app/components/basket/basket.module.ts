import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { BasketComponent } from './basket.component';

const routes: Routes = [
  { path: '', component: BasketComponent, }
];

@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireStorageModule
  ]
})
export class BasketModule { }
