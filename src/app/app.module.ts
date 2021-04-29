import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { AboutComponent } from './components/about/about.component';
import { PaymentComponent } from './components/payment/payment.component';
import { WarrantyComponent } from './components/warranty/warranty.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProductsComponent } from './components/products/products.component';
import { SliderComponent } from './components/slider/slider.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { BasketComponent } from './components/basket/basket.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { MainComponent } from './components/main/main.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { CompareComponent } from './components/compare/compare.component';
import { CompareNotificationComponent } from './components/compare-notification/compare-notification.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FormAddressComponent } from './components/form-address/form-address.component';
import { FormCardComponent } from './components/form-card/form-card.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    AboutComponent,
    PaymentComponent,
    WarrantyComponent,
    ContactsComponent,
    ProductsComponent,
    SliderComponent,
    SearchComponent,
    ProductDetailComponent,
    HeaderComponent,
    BasketComponent,
    AuthorizationComponent,
    MainComponent,
    ProductsFilterComponent,
    CompareComponent,
    CompareNotificationComponent,
    SettingsComponent,
    FormAddressComponent,
    FormCardComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
