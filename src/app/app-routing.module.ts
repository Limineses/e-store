import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CompareComponent } from './components/compare/compare.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { AboutComponent } from './components/about/about.component';
import { BasketComponent } from './components/basket/basket.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { PaymentComponent } from './components/payment/payment.component';
import { WarrantyComponent } from './components/warranty/warranty.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'warranty', component: WarrantyComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
