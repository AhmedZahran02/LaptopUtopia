import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgwWowModule } from 'ngx-wow';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SigninComponent } from './signin/signin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { FilteringPageComponent } from './filtering-page/filtering-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddNewCPUComponent } from './add-new-cpu/add-new-cpu.component';
import { AddNewGPUComponent } from './add-new-gpu/add-new-gpu.component';
import { AddNewMemoryComponent } from './add-new-memory/add-new-memory.component';
import { AddNewStorageComponent } from './add-new-storage/add-new-storage.component';
import { AddNewLaptopComponent } from './add-new-laptop/add-new-laptop.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddNewBrandComponent } from './add-new-brand/add-new-brand.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { ViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { UserPageComponent } from './user-page/user-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckComplaintsComponent } from './check-complaints/check-complaints.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ViewBrandsComponent } from './view-brands/view-brands.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { LoadingComponent } from './loading/loading.component';
import { ToastComponent } from './toast/toast.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    HomepageComponent,
    SignupComponent,
    FilteringPageComponent,
    ProductPageComponent,
    CartComponent,
    AdminDashboardComponent,
    AddProductComponent,
    AddNewCPUComponent,
    AddNewGPUComponent,
    AddNewMemoryComponent,
    AddNewStorageComponent,
    AddNewLaptopComponent,
    ListProductsComponent,
    AddNewBrandComponent,
    ViewProductsComponent,
    ViewOrdersComponent,
    ViewComplaintsComponent,
    UserPageComponent,
    WishlistComponent,
    CheckComplaintsComponent,
    ProfilePageComponent,
    ViewBrandsComponent,
    AddAdminComponent,
    LoadingComponent,
    ToastComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgwWowModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
