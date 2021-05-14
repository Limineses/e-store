import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SharedModule } from './../shared/shared.module';

import { ReviewsComponent } from './reviews.component';

const routes: Routes = [
  { path: '', component: ReviewsComponent, }
];

@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ReviewsModule { }
