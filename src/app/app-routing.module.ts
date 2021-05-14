import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'checkout', loadChildren: () => import('./components/checkout/checkout.module')
  .then(n => n.CheckoutModule), canActivate: [AuthGuard] },

  { path: 'settings', loadChildren: () => import('./components/settings/settings.module')
  .then(n => n.SettingsModule), canActivate: [AuthGuard] },

  { path: 'compare', loadChildren: () => import('./components/compare/compare.module')
  .then(n => n.CompareModule) },

  { path: 'authorization', loadChildren: () => import('./components/authorization/authorization.module')
  .then(n => n.AuthorizationModule) },

  { path: 'basket', loadChildren: () => import('./components/basket/basket.module')
  .then(n => n.BasketModule) },

  { path: 'reviews/:id', loadChildren: () => import('./components/reviews/reviews.module')
  .then(n => n.ReviewsModule) },

  { path: 'product-detail/:id', loadChildren: () => import('./components/product-detail/product-detail.module')
    .then(n => n.ProductDetailModule) },

  { path: 'products', loadChildren: () => import('./components/products/products.module')
    .then(n => n.ProductsModule) },

  { path: '', loadChildren: () => import('./components/main/main.module')
    .then(n => n.MainModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
