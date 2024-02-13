import { Session } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faMagnifyingGlass, faUser, faCartShopping, faRegistered, faRightToBracket, faRightFromBracket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  title = 'dbProject';

  username = sessionStorage.getItem('username');


  expandSearchBar = true;
  isMobile = true;

  faGlass = faMagnifyingGlass;
  faUser = faUser;
  
  faRegister = faRegistered;
  faLogin = faRightToBracket;
  faLogout= faRightFromBracket;

  faCart = faCartShopping;
  faWishlist = faHeart;

  searchVal;

  loggedIn = false;
  isAdmin = false;

  @Output() searchKey = new EventEmitter();
  @Input() searchActive = false;


  emit()
  {
    this.searchKey.emit(this.searchVal);
  }


  constructor(private wowService: NgwWowService, private route:Router, private active:ActivatedRoute) {
 
  }

  ngOnInit()
  {
    if (sessionStorage.getItem("username") != "null" && sessionStorage.getItem("username") != null)
    {
      this.loggedIn = true;

      if (sessionStorage.getItem("isAdmin") != "null" && sessionStorage.getItem("isAdmin") != null && sessionStorage.getItem("isAdmin") == "1")
      {
        this.isAdmin = true;
      }

    }
  }


  showCart()
  {
    this.route.navigate(['cart']);
  }

  showWishlist()
  {
    this.route.navigateByUrl('wishlist');
  }

  showLogin()
  {
    this.route.navigate(['home/login']);
  }

  showRegister()
  {
    this.route.navigate(['home/register']);
  }

  showLogout()
  {
    sessionStorage.setItem('username', null)
    sessionStorage.setItem('isAdmin', null)
    
    this.loggedIn = false;

    console.log("LoggedOut");
    
    this.route.navigateByUrl('home/login');
  }

  showProfile()
  {
    this.route.navigateByUrl('user');
  }


}
