import { NgwWowService } from 'ngx-wow';
import { DecryptImagesService } from './../Shared/decrypt-images.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faMinus, faPlus, faTrash, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  WishlistUrl = "https://laptoputopia.000webhostapp.com/backend/Wishlist/getUserWishlist.php";
  deleteUrl = "https://laptoputopia.000webhostapp.com/backend/Wishlist/deleteProductFromWishlist.php";
  convertWishList = "https://laptoputopia.000webhostapp.com/backend/Wishlist/convertWishlistToCart.php";
  
  deleteIcon = faTrash;
  wishlistIcon = faHeart;

  loading = false;
  emptyWishlist = false;


  totalPrice = 0;

  constructor(private wowService: NgwWowService,private router:Router, private http: HttpClient, private Decrypter : DecryptImagesService) {
    wowService.init();
   }
   Products;

   ngOnInit(){

    let username = sessionStorage.getItem('username');
    let isAdmin = sessionStorage.getItem('isAdmin');


    if (isAdmin == "1")
    {
      this.router.navigate(['home/AdminPanel']);
      return;
    }

    if (username == "null")
    {
      this.router.navigate(['home/login']);
    }

    this.readProducts();

   }

   calculateTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.Products.length; i++) {
      this.totalPrice = this.totalPrice + (+this.Products[i].price) * (+this.Products[i].cartQ);
    }
  }

   readProducts()
   {
    this.loading = true;

    let username = sessionStorage.getItem('username');
    let isAdmin = sessionStorage.getItem('isAdmin');

    this.Products = [];
    this.http.get(this.WishlistUrl + "?username=" + username).subscribe(
      (data : Array<any>)=>
      {
        this.loading = false;
        this.Products = data;
        
        for(let i = 0; i < this.Products.length; i++)
        {
          let Images = [];  
          Images = this.Decrypter.getImagesArray(this.Products[i].imageurls);

          let image = "url(" + Images[0] + ")";
          
          this.Products[i]['mainImage'] = image;

          this.totalPrice = this.totalPrice + (+this.Products[i].price);
        }

        
      this.emptyWishlist = this.Products.length == 0;
      }
    )
   }
  


  clearWishlist()
  {
    for (let i = 0; i < this.Products.length; i++) {
      this.deleteProduct(this.Products[i].mid);
    }
    this.emptyWishlist = true;
    this.totalPrice = 0;
  }

  AddToCart()
  {
    let username = sessionStorage.getItem('username'); 
    this.http.get(this.convertWishList + "?username=" + username).subscribe(
      (data)=>
      {
        if (data['Done'] == 1)
        {
          this.clearWishlist();
        }
      }
    )
  }

  
  deleteProduct(mid) {
    let username = sessionStorage.getItem('username');

    this.http.get(this.deleteUrl + "?username=" + username + "&mid=" + mid).subscribe((data) => {
      if (data[0]["Done"] == 1) {
        for (let i = 0; i < this.Products.length; i++) {
          if (this.Products[i]['mid'] == mid) {
            this.Products.splice(i, 1);
            this.emptyWishlist = this.Products.length == 0;
            this.calculateTotalPrice();
            return;
          }
        }
      }

    })
  }
}
