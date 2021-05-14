import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SharedModule } from './../shared/shared.module';

import { CompareComponent } from './compare.component';

const routes: Routes = [
  { path: '', component: CompareComponent, }
];

@NgModule({
  declarations: [CompareComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireStorageModule,
    SharedModule
  ]
})
export class CompareModule { }
