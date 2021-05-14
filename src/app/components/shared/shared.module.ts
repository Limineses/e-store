import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { CompareNotificationComponent } from './compare-notification/compare-notification.component';
import { FormAddressComponent } from './form-address/form-address.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ViewRatingComponent } from './view-rating/view-rating.component';
import { FormCardComponent } from './form-card/form-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AngularFireStorageModule,
    CompareNotificationComponent,
    FormAddressComponent,
    PaginationComponent,
    ViewRatingComponent,
    FormCardComponent
  ],
  declarations: [
    CompareNotificationComponent,
    FormAddressComponent,
    PaginationComponent,
    ViewRatingComponent,
    FormCardComponent
  ]
})
export class SharedModule { }
