import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  username;
  Question = null;
  addComplaintUrl = "https://laptoputopia.000webhostapp.com/backend/Complaints/addComplaint.php";

  constructor(private http:HttpClient, private route: Router,private Converter:ObjectToFormdataService) {
    this.username = sessionStorage.getItem('username');
    let isAdmin = sessionStorage.getItem('isAdmin');

    if (isAdmin == null || isAdmin == "null" || isAdmin == '1')
    {
      route.navigateByUrl('home/login');
    }
   }

  ngOnInit(): void {
  }

  sendComplaint()
  {
    let x = {
      'customerid' : this.username,
      'question' : this.Question
    };

    let Request = this.Converter.convertToFormData(x);
    this.http.post(this.addComplaintUrl,Request).subscribe(
      (data)=>
      {
        this.Question = "";
      }
    );
  }

}
