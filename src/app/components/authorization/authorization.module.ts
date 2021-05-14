import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthorizationComponent } from './authorization.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent, }
];

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthorizationModule { }
