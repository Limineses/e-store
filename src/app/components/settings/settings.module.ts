import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent, }
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class SettingsModule { }
