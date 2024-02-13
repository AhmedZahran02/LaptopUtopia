import { NgwWowService } from 'ngx-wow';
import { HttpClient } from '@angular/common/http';
import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { Router } from '@angular/router';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { faCartPlus, faEye,faCircle,faHeart, faCodeCompare, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  username;
  isAdmin;

  showComplaints = false;

  constructor(private router: Router,private Converter: ObjectToFormdataService, private http:HttpClient,private wowService: NgwWowService) {

   }

   ngOnInit(): void {

    this.wowService.init();

    this.username = sessionStorage.getItem('username');
    this.isAdmin = sessionStorage.getItem('isAdmin');

    console.log(this.username);


    if (this.isAdmin == "1")
    {
      this.router.navigateByUrl('home/AdminPanel');
    }

    if (this.username != "null" && this.username != null)
    {
      this.showComplaints = true;
    }
    else
    {
      this.showComplaints = false;
    }
   }
  

  faEye = faEye;
  faCircle = faCircle;
  faCartplus = faCartPlus;
  faHeart = faHeart;
  faCompare = faCodeCompare;
  arrowRight= faArrowRight;

  x = sessionStorage;

  Question = null;

  // images will be imported from the database
  slideConfig = {
    slidesToShow: 5, slidesToScroll: 5,
    dots: true,
    autoplay: false,
    autoplaySpeed: Math.random() * (1000) + 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  slides = [
    { id: 1, img: "https://www.sigma-computer.com/image/products/1667049897FX506LHB-HN8G5W%20web%201.webp", name: "NOTEBOOK-LENOVO-AMD-IdeaPad Gaming 3- 82K200MHED R7-5800H 8C 16T -RAM 8G 1 8 -SSD 512 GEN3 2.5 -RTX3050 4G 85w-15.6-FHD-IPS-120Hz- 45Wh - 135W -White Backlit-Arabic M100 MOUSE-", prevPrice: 12, activePrice: 1200 },
    { id: 2, img: "https://www.sigma-computer.com/image/products/1667471503166082349809.webp", name: "ASUS TUF F15 FX506LHB-HN8G5W Gaming Laptop - Intel Core i5-10300H 8GB, 512GB SSD, NVIDIA GTX 1650 4GB, 15.6-Inch FHD 144Hz, Win11", prevPrice: 12, activePrice: 1200 },
    { id: 3, img: "https://www.sigma-computer.com/image/products/165997183301.webp", name: "HP Victus Laptop 16-d1016ne Intel® Core™ i7-12700H 16 GB DDR5 SSD 1 TB PCIe® NVMe 144 Hz IPS NVIDIA® GeForce RTX™ 3050 Ti 4 GB", prevPrice: 12, activePrice: 1200 },
    { id: 4, img: "https://www.sigma-computer.com/image/products/16662778411.jpg", name: "NOTEBOOK-LENOVO-CI5-LEGION 5-(82JH006WAX) I5-11400H (6C/12T)-RAM 16G (2*8)-SSD 1T Gen4+(M.2)-RTX3060 6G 130w-15.6-FHD-IPS-165Hz-100% sRGB-(60Wh)-(230W)-RGB Backlit-Arabic", prevPrice: null, activePrice: 1200 },
    { id: 5, img: "https://www.sigma-computer.com/image/products/16662760632.jpg", name: "NOTEBOOK-LENOVO-CI5-LEGION 5-(82JH006WAX) I5-11400H (6C/12T)-RAM 16G (2*8)-SSD 1T Gen4+(M.2)-RTX3060 6G 130w-15.6-FHD-IPS-165Hz-100% sRGB-(60Wh)-(230W)-RGB Backlit-Arabic", prevPrice: null, activePrice: 1200 },
    { id: 1, img: "https://www.sigma-computer.com/image/products/1667049897FX506LHB-HN8G5W%20web%201.webp", name: "NOTEBOOK-LENOVO-CI5-LEGION 5-(82JH006WAX) I5-11400H (6C/12T)-RAM 16G (2*8)-SSD 1T Gen4+(M.2)-RTX3060 6G 130w-15.6-FHD-IPS-165Hz-100% sRGB-(60Wh)-(230W)-RGB Backlit-Arabic", prevPrice: null, activePrice: 1200 },
  ];


  GoTo(Where : Number)
  {
    this.router.navigate(['home/Products'],{queryParams:{workfield:Where}});
  }


}
