import { NgwWowService } from 'ngx-wow';
import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { DecryptImagesService } from './../Shared/decrypt-images.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { faCoins, faCartShopping, faHeart, faExchange, faUser, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {


  workfield;
  mid;

  userIcon = faUser;
  starIcon = faStar;

  url = "https://laptoputopia.000webhostapp.com/backend/Product/getProductData.php";
  getReviewsUrl = "https://laptoputopia.000webhostapp.com/backend/Reviews/getReviews.php";
  addToCartUrl = "https://laptoputopia.000webhostapp.com/backend/Cart/insertProductToCart.php";
  addToWishlistUrl = "https://laptoputopia.000webhostapp.com/backend/Wishlist/addProductToWishlist.php";
  addReviewUrl = "https://laptoputopia.000webhostapp.com/backend/Reviews/addReview.php";

  Reviews = null;

  SelectedRating = 0;

  PageLoaded = false;

  constructor(private wowService: NgwWowService,private http: HttpClient,private Former:ObjectToFormdataService, private route:Router,private decryptImages:DecryptImagesService) {
    let username = sessionStorage.getItem('username');
    let isAdmin = sessionStorage.getItem('isAdmin');


    if (username == null || username == "null")
    {
      route.navigateByUrl('home/login');
    }
    else if (isAdmin == "1")
    {
      route.navigateByUrl('home/AdminPanel');
    }

  }


  Product;
  DescriptionMap: Array<Array<any>>;
  
  mainImage;
  subImages = [];

  ngOnInit(): void {

    this.wowService.init();

    this.workfield = sessionStorage.getItem('workfield');
    this.mid = sessionStorage.getItem('mid');



    if (this.mid == null || this.mid == "null" || this.workfield == null || this.workfield == "null")
    {
      this.route.navigateByUrl("/home/Products?workfield=" + this.workfield);
    }
    
    this.http.get(this.url + "?workfield=" + this.workfield + "&mid=" + this.mid).subscribe((data) => {
      
      this.Product = data[0];
      
      let imageurls :string = this.Product.imageurls;
      
      let ArrImages = this.decryptImages.getImagesArray(imageurls);

      this.mainImage = ArrImages[0];
      ArrImages.reverse();
      ArrImages.pop();
      this.subImages = ArrImages;



      for (let i = this.subImages.length - 1; i >= 0; i--)
      {
          if (this.subImages[i] == "")
          {
            this.subImages.pop();
          }
      }
      // currentMainImage = this.Product.Images[0];

      this.DescriptionMap = new Array<Array<any>>();

      for (var property in this.Product) {
        if (property == "imageurls")
        {
          continue;
        }
        this.DescriptionMap.push([property, this.Product[property]]);
      }

      this.http.get(this.getReviewsUrl + "?productid=" + this.mid).subscribe((data2)=>{
        console.log(data2);
        
        this.Reviews = data2;
        this.PageLoaded = true;
      })

    })
  }


  // Icons
  CoinsIcon = faCoins;
  cartIcon = faCartShopping;
  heartIcon = faHeart;
  swapIcon = faExchange;

  currentMainImage = null;


  Comment = "";
  Submitting = false;

  submitComment() {
    let Rating = {
      'mid':this.mid,
      'rating': this.SelectedRating,
      'comment': this.Comment,
      'username' : sessionStorage.getItem('username')
    };


    let Request = this.Former.convertToFormData(Rating);

    this.Submitting = true;

    this.http.post(this.addReviewUrl,Request).subscribe((data)=>{

      this.http.get(this.getReviewsUrl + "?productid=" + this.mid).subscribe((data2)=>{
        this.Submitting = false;
        this.Reviews = data2;
      })

    })


  }

  swap(index,mainImage)
  {
    let x = this.subImages[index];
    this.subImages[index] = mainImage;
    this.mainImage = x;
  }

  addToCart()
  {
    let username = sessionStorage.getItem('username');
    let mid = sessionStorage.getItem('mid');
    
    this.http.get(this.addToCartUrl + "?username=" + username + "&mid=" + mid).subscribe((data)=>{console.log(data);
    })
  }

  addToWishlist()
  {
    let username = sessionStorage.getItem('username');
    let mid = sessionStorage.getItem('mid');
    
    this.http.get(this.addToWishlistUrl + "?username=" + username + "&mid=" + mid).subscribe((data)=>{
    });
  }

}
