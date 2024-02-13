import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminName = null;

  owner = '0';

  constructor(private route:Router) { }

  ngOnInit(): void {
    let isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin == null || isAdmin == "null" || isAdmin == "0")
    {
      this.route.navigateByUrl('home/login?isAdmin=1');
    }

    this.owner = sessionStorage.getItem('isOwner');
  }

}
