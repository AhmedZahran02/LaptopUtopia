import { NgwWowService } from 'ngx-wow';
import { DecryptImagesService } from './../Shared/decrypt-images.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faMinus, faPlus, faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartUrl = "https://laptoputopia.000webhostapp.com/backend/Cart/getUserCart.php";
  updateAmountURl = "https://laptoputopia.000webhostapp.com/backend/Cart/updateAmoutInCart.php";
  productUrl = "https://laptoputopia.000webhostapp.com/backend/Product/getProductData.php";
  deleteUrl = "https://laptoputopia.000webhostapp.com/backend/Cart/deleteProductFromCart.php";
  clearUrl = "https://laptoputopia.000webhostapp.com/backend/Cart/clearCart.php";
  makeOrderUrl = "https://laptoputopia.000webhostapp.com/backend/Order/makeOrderFromCart.php";

  cartPrice = 2000;

  minusIcon = faMinus;
  plusIcon = faPlus;
  deleteIcon = faTrash;
  cartIcon = faCartShopping;

  loading = false;
  emptyCart = true;

  disableOrderRequest = false;


  totalPrice = 0;

  constructor(private wowService: NgwWowService,private router: Router, private http: HttpClient, private Decrypter: DecryptImagesService) {
      wowService.init();
  }
  Products;

  ngOnInit() {

    let username = sessionStorage.getItem('username');
    let isAdmin = sessionStorage.getItem('isAdmin');


    if (isAdmin == "1") {
      this.router.navigate(['home/AdminPanel']);
      return;
    }

    if (username == "null") {
      this.router.navigate(['home/login']);
    }

    this.readProducts();

  }

  readProducts() {
    this.loading = true;

    let username = sessionStorage.getItem('username');
    let isAdmin = sessionStorage.getItem('isAdmin');

    this.Products = [];
    this.http.get(this.cartUrl + "?username=" + username).subscribe(
      (data: Array<any>) => {
        this.loading = false;
        this.Products = data;

        for (let i = 0; i < this.Products.length; i++) {
          let Images = [];
          Images = this.Decrypter.getImagesArray(this.Products[i].imageurls);

          let image = "url(" + Images[0] + ")";

          this.Products[i]['mainImage'] = image;
          this.Products[i]['lastQuantity'] = this.Products[i]['cartQ'];
        }

        this.calculateTotalPrice();


        this.emptyCart = this.Products.length == 0;

      }
    )
  }


  calculateTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.Products.length; i++) {
      this.totalPrice = this.totalPrice + (+this.Products[i].price) * (+this.Products[i].cartQ);
    }
  }


  ChangeAmount(id, cnt: number) {

    for (let i = 0; i < this.Products.length; i++) {
      if (this.Products[i]['mid'] == id) {

        if (+this.Products[i]['lastQuantity'] + cnt >= 0) {
          this.Products[i]['lastQuantity'] = +this.Products[i]['lastQuantity'] + cnt;
        }

        return;
      }
    }
  }

  UpdateCart() {
    for (let product of this.Products) {
      if (product.lastQuantity != product.cartQ) {

        if (product.lastQuantity == 0) {
          console.log(product.mid);
          
          this.deleteProduct(product.mid);
        }
        else {

          let Temp = product.cartQ;
          product.cartQ = product.lastQuantity;
          this.calculateTotalPrice();

          this.http.get(this.updateAmountURl + "?username=" + sessionStorage.getItem('username') + "&mid=" + product.mid + "&price=" + this.totalPrice + "&amount=" + product.lastQuantity).subscribe(
            (data) => {
              if (data["Done"] == 0) {
                product.cartQ = Temp;
                this.calculateTotalPrice();
              }
            }
          )
        }
      }
    }
  }

  clearCart() {
    let username = sessionStorage.getItem('username');
    this.http.get(this.clearUrl + "?username=" + username).subscribe(
      (data) => {

        console.log(data);
       this.Products = [];         
        this.emptyCart = true;
      }
    );
  }

  MakeOrder() {
    // if (this.disableOrderRequest) return;

    this.disableOrderRequest = true;

    let username = sessionStorage.getItem('username');

    console.log(this.makeOrderUrl + "?username=" + username);
    

    this.http.get(this.makeOrderUrl + "?username=" + username).subscribe(
      (data) => {

        console.log(data);
        
        
        if (data["Done"] == true) {
          console.log("done");

          this.disableOrderRequest = false;
          this.clearCart();
        }
      }
    )

  }

  deleteProduct(mid) {
    let username = sessionStorage.getItem('username');
    this.http.get(this.deleteUrl + "?username=" + username + "&mid=" + mid).subscribe((data) => {
      if (data["Done"] == 1) {
        for (let i = 0; i < this.Products.length; i++) {
          if (this.Products[i]['mid'] == mid) {
            this.Products.splice(i, 1);
            this.calculateTotalPrice();
            this.emptyCart = this.Products.length == 0;
            this.UpdateCart();
            return;
          }
        }
      }

    })
  }


}
