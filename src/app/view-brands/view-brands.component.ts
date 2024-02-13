import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { HttpClient } from '@angular/common/http';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-brands',
  templateUrl: './view-brands.component.html',
  styleUrls: ['./view-brands.component.css']
})
export class ViewBrandsComponent implements OnInit {

  deleteIcon = faTrash;

  getBrandUrl = "https://laptoputopia.000webhostapp.com/backend/dashboard/getbrand.php";
  deleteBrandUrl = "https://laptoputopia.000webhostapp.com/backend/dashboard/deletebrand.php"


  Brands = null;

  BrandsLoaded = false;

  constructor(private http: HttpClient,private dataConv:ObjectToFormdataService) { }

  ngOnInit(): void {

    let Request = new FormData();
    Request.append('workfield','10');

    this.http.post(this.getBrandUrl,Request).subscribe(
      (data)=>
      {
        this.BrandsLoaded = true;
        this.Brands = data;

        for (let i = 0; i < this.Brands.length; i++)
        {
          
          switch(this.Brands[i].workfield)
          {
            case '0': this.Brands[i].workField = "Laptop"; break;
            case '1': this.Brands[i].workField = "CPU"; break;
            case '2': this.Brands[i].workField = "GPU"; break;
            case '3': this.Brands[i].workField = "Ram"; break;
            case '4': this.Brands[i].workField = "Hard Disk"; break;
          }
        }
      }
    )
  }

  deleteBrand(brand)
  {
    let y = this.dataConv.convertToFormData(brand);

    this.http.post(this.deleteBrandUrl,y).subscribe(
      (data)=>
      {
        console.log(data);
        
      }
    )
    
  }

}
