import { UserPageComponent } from './user-page/user-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FilteringPageComponent } from './filtering-page/filtering-page.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'home/Products/ViewProduct', component: ProductPageComponent
  },
  {
    path: 'cart' , component: CartComponent
  },
  {
    path: 'wishlist' , component: WishlistComponent
  },
  {
    path: 'user' , component: UserPageComponent
  },
  {
    path: 'home/AdminPanel', component: AdminDashboardComponent
  },
  {
    path: 'home/login' , component: SigninComponent
  },
  {
    path: 'home/Products/login' , component: SigninComponent
  },
  {
    path: 'home/Products', component: FilteringPageComponent
  },
  {
    path: 'home' , component: HomepageComponent
  },
  {
    path: 'home/register', component: SignupComponent
  },
  {
    path: 'home/Products/register', component: SignupComponent
  },
  {
    path: 'home/login/register', redirectTo : 'home/register'
  },
  {
    path: '**' , redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
