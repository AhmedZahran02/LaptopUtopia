import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faQuestion, faQuestionCircle, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-check-complaints',
  templateUrl: './check-complaints.component.html',
  styleUrls: ['./check-complaints.component.css']
})
export class CheckComplaintsComponent implements OnInit {

  questionIcon = faQuestionCircle;
  eyeIcon = faEye;
  getRepliedComplaints = "https://laptoputopia.000webhostapp.com/backend/Complaints/getUserRepliedComplaints.php";
  getUserOrder = "https://laptoputopia.000webhostapp.com/backend/Order/getOrderofUser.php";

  getOrderItemsUrl = "https://laptoputopia.000webhostapp.com/backend/Order/getItemsInOrder.php";

  RepliedComplaints: Array<Object> = [];
  userOrders: Array<Object> = [];

  selectedOrder = -1;

  OrdersLoaded = false;
  ComplaintsLoaded = false;
  noComplaints = false;
  noOrders = false;

  OrderItems = [];
  hideContent = true;

  @Output() loaded = new EventEmitter();

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let username = sessionStorage.getItem('username');
    
    this.http.get(this.getRepliedComplaints+ "?username=" + username).subscribe(
      (data: Array<Object>)=>
      {
        this.RepliedComplaints = data;
        this.ComplaintsLoaded = true;
        this.noComplaints = (this.RepliedComplaints.length == 0) ? true : false;
      }
    );

    this.http.get(this.getUserOrder + "?username=" + username).subscribe(
      (data : Array<Object>)=>
      {
        this.OrdersLoaded = true;
        this.noOrders = data.length == 0;
        this.userOrders = data;

        for (let i = 0 ; i < this.userOrders.length ;i++)
        {
          switch (this.userOrders[i]['status'])
          {
            case "0": 
                      this.userOrders[i]['status'] = "procceeding";
                      this.userOrders[i]['statusColor'] = "blue";
                      break;


            case "1": this.userOrders[i]['status'] = "Shipped";
                      this.userOrders[i]['statusColor'] = "orange";
                      break;


            case "2": this.userOrders[i]['status'] = "succeeded";
                      this.userOrders[i]['statusColor'] = "green";
                      break;

            case "3": this.userOrders[i]['status'] = "canceled";
                      this.userOrders[i]['statusColor'] = "red";
                      break;
          }
        }
        
      }
    )
    

  }


  changeOrderItems(id)
  {
    

    this.hideContent = true;

    this.http.get(this.getOrderItemsUrl + "?id=" + id).subscribe(
      (data: Array<any>) =>
      {
        this.selectedOrder = id;
        this.OrderItems = data;
        console.log(this.OrderItems);
        
        this.hideContent = false;
      }
    )
  }


}
