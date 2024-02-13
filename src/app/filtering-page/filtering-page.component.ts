import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { DecryptImagesService } from './../Shared/decrypt-images.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from './../Shared/product-service.service';
import { Component, OnInit } from '@angular/core';
import { faBasketShopping, faMinusSquare, faPlusSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgwWowConfig, NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import { Session } from 'protractor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtering-page',
  templateUrl: './filtering-page.component.html',
  styleUrls: ['./filtering-page.component.css']
})
export class FilteringPageComponent implements OnInit {

  TempProduct = null
  Prod;
  ProductsCnt: number;
  PageNumbers: number;
  prodPerPage: number = 5;
  currentProducts = 0;

  productUrl = "https://laptoputopia.000webhostapp.com/backend/Product/listAll.php";
  filtersUrl = "https://laptoputopia.000webhostapp.com/backend/filters/getfilters.php";
  applyFilterUrl = "https://laptoputopia.000webhostapp.com/backend/filters/applyfilters.php";
  searchUrl = "https://laptoputopia.000webhostapp.com/backend/search/search.php";
  addToCartUrl = "https://laptoputopia.000webhostapp.com/backend/Cart/insertProductToCart.php";
  addToWishlistUrl = "https://laptoputopia.000webhostapp.com/backend/Wishlist/addProductToWishlist.php";

  TempArray: Array<number>;
  viewProducts: Array<object> = [];

  workField;
  mainImages = [];

  FiltersSelected = []
  Keys;
  Values;

  loggedIn = false;

  searchKey = "";

  productLoaded = false;
  pageLoaded = false;

  constructor(private wowService: NgwWowService,private Decrypter: DecryptImagesService,private converter : ObjectToFormdataService, private http: HttpClient, private ActiveRoute: ActivatedRoute, private products: ProductServiceService, private animations: NgwWowService, private route: Router) {

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


    ActiveRoute.queryParamMap.subscribe((params) => {

      this.workField = params['params']['workfield'];

      if (this.workField == null) {
        route.navigate(['/home']);
      }

    })

    if (sessionStorage.getItem('username') != null && sessionStorage.getItem('username') != "null")
    {
      this.loggedIn = true;
    }



    this.http.get(this.productUrl + "?workField=" + this.workField).subscribe((data) => {
      this.Products = data;
      this.productLoaded = true;

      for (let product of this.Products) {
        let imageurls = product.imageurls;
        let imageArr = Decrypter.getImagesArray(imageurls);
        this.mainImages.push(imageArr[0]);
      }

    });

    let fd: FormData = new FormData();
    fd.append("workfield", this.workField);
    this.http.post(this.filtersUrl, fd).subscribe((data) => {

      console.log(data);
      

      this.pageLoaded = true;

      this.Keys = Object.keys(data);
      this.Values = Object.values(data);
      this.Filters = new Array<any>();

      for (let i = 1; i < this.Keys.length; i++) {
        this.FiltersSelected.push([]);
        this.FiltersSelected[i] = Array(this.Values[i].length).fill(false);
        let x = {
          'Title': this.Keys[i],
          'filters': this.Values[i],
          'display' : data[0][i-1]
        }
        this.Filters.push(x);
      }

      this.Keys.splice(0,1);
      this.Values.splice(0,1);


      this.totalFilters = this.Filters.length;
      this.Prod = products.getAllProducts();

      this.ProductsCnt = this.Products.length;
      this.PageNumbers = Math.ceil(this.ProductsCnt / this.prodPerPage);
      this.maxPageCounter = Math.ceil(this.PageNumbers / 5);

      this.ChangePage(0);


    }
    );
  }

  ngOnInit() {
    this.wowService.init();
    scrollTo(0, 0);
    this.animations.init();
  }



  // Icons
  plusIcon = faPlusSquare;
  minusIcon = faMinusSquare;

  cartIcon = faBasketShopping;
  whishlistIcon = faHeart;


  totalFilters = 0;




  // Filters
  Filters;


  Products;

  // Extras
  PrevActive = false;
  NextActive = true;
  CurrentPage = 1;

  maxPageCounter;
  PagesCounter = 0;
  trigger = 0;
  // Functions
  HideDropDown(A) {
    document.getElementById(A).style['animation-name'] == "popUp" ? document.getElementById(A).style['animation-name'] = "popAway" : document.getElementById(A).style['animation-name'] = "popUp";
    setTimeout(() => { document.getElementById(A).style['display'] == "block" ? document.getElementById(A).style['display'] = "none" : document.getElementById(A).style['display'] = "block"; }, 50);
  }

  ChangeCurrentProduct(newProd) {
    window.scrollTo(0, 0);
    this.currentProducts = newProd;
    this.ChangePage(0);
  }

  ChangePage(Direction: number) {


    this.PagesCounter += Direction;

    this.TempArray = Array(5).fill(0).map((_, i) => i + 1 + (this.PagesCounter * 5));

    while (this.viewProducts.length > 0) {
      this.viewProducts.pop();
    }

    for (let i = 0; i < 5; i++) {
      if (this.currentProducts * 5 + i < this.Products.length)
        this.viewProducts.push(this.Products[this.currentProducts * 5 + i]);
    }

    while (this.TempArray[this.TempArray.length - 1] > this.PageNumbers) {
      this.TempArray.pop();
    }

    // if (this.TempArray.length == 0)
    // {
    //   console.log("Here");
    //   this.maxPageCounter--;
    //   this.ChangePage(-1);
    //   return;

    // }


    console.log(this.PagesCounter);
    console.log(this.maxPageCounter);



    this.PrevActive = true;
    this.NextActive = true;
    if (this.PagesCounter == 0)
      this.PrevActive = false;
    if (this.PagesCounter == this.maxPageCounter - 1)
      this.NextActive = false;

  }

  loadProduct(mid) {

    

    sessionStorage.setItem('mid', mid);
    sessionStorage.setItem('workfield', this.workField);

    this.route.navigateByUrl('home/Products/ViewProduct')
  }


  resetSelections() {
    for (let i = 0; i < this.FiltersSelected.length; i++) {
      for (let j = 0; j < this.FiltersSelected[i].length; j++) {
        this.FiltersSelected[i][j] = false;
      }
    }
  }

  request = [];

  filterProducts() {
    let x = {};

    let y = "";

    for (let i = 0; i < this.FiltersSelected.length; i++) {

      let key = this.Keys[i];
      let values = [];


      for (let j = 0; j < this.FiltersSelected[i].length; j++) {
        if (this.FiltersSelected[i][j] == true) values.push(this.Values[i][j]);
      }

      
      if (values.length > 0) {
          x[key] = values;
      }
    }

    let request = this.converter.ArrayConverter(x);
    request.append("workfield", this.workField);
    
    this.http.post(this.applyFilterUrl,request).subscribe((data)=>{this.Products = data;
      
      console.log(data);
      
      
      this.ChangePage(0);

      this.mainImages = [];
      for (let product of this.Products) {
        let imageurls = product.imageurls;
        let imageArr = this.Decrypter.getImagesArray(imageurls);
        this.mainImages.push(imageArr[0]);
      }
      
    })
    
  }

  
  receive(x: string)
  {
    let y = {
      'workfield' : this.workField,
      'q':x
    }

    if (x == "")
    {
      if (this.TempProduct != null)
      {
        this.Products = this.TempProduct;

        this.mainImages = []
        for (let product of this.Products) {
          let imageurls = product.imageurls;
          let imageArr = this.Decrypter.getImagesArray(imageurls);
          this.mainImages.push(imageArr[0]);
        }

        this.ChangePage(0);
      }
      return;
    }

    let Request = this.converter.convertToFormData(y);

    this.http.post(this.searchUrl,Request).subscribe(
      (data)=>
      {
        if (this.TempProduct == null)
        {
          this.TempProduct = this.Products;
        }

        this.Products = data;

        this.mainImages = []

        for (let product of this.Products) {
          
          let imageurls = product.imageurls;
          let imageArr = this.Decrypter.getImagesArray(imageurls);
          this.mainImages.push(imageArr[0]);
        }

        console.log(this.mainImages);
        
        
        this.ChangePage(0);        
      }
    )    
  }

  addToCart(mid)
  {
    let username = sessionStorage.getItem('username');

    console.log(this.addToCartUrl + "?username=" + username + "&mid=" + mid);
    
    
    this.http.get(this.addToCartUrl + "?username=" + username + "&mid=" + mid).subscribe((data)=>{console.log(data);
    })
  }

  addToWishlist(mid)
  {
    let username = sessionStorage.getItem('username');
    
    this.http.get(this.addToWishlistUrl + "?username=" + username + "&mid=" + mid).subscribe((data)=>{
      console.log(data);
      
    });
  }

}
