import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SliderComponent } from './slider/slider.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', component: MainComponent, }
];

@NgModule({
  declarations: [
    MainComponent,
    SliderComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class MainModule { }
