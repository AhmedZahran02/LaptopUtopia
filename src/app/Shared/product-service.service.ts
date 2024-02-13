import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  ProductsURL = "";
  LaptopsURL = "";
  CPUsURL = "";
  GPUsURL = "";
  StoragesURL = "";
  RamsURL = "";


  

  constructor(private http:HttpClient) { }

  getAllProducts()
  {
      this.http.get(this.LaptopsURL);
      return null;
  }
}
