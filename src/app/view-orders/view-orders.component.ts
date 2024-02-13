import { HttpClient } from '@angular/common/http';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  deleteIcon = faTrash;
  penIcon = faPen;

  status = 0;
  currentid;

  GetOrdersUrl = "https://laptoputopia.000webhostapp.com/backend/Order/viewAllOrders.php";
  DeleteOrdersUrl = "https://laptoputopia.000webhostapp.com/backend/Order/cancelOrder.php";
  updateOrderUrl = "https://laptoputopia.000webhostapp.com/backend/Order/updataOrder.php";

  constructor(private http: HttpClient) {


  }

  ngOnInit(): void {

    this.UpdateList();
  }

  Orders;

  editOrder() {

    this.http.get(this.updateOrderUrl + "?id=" + this.currentid + "&status=" +this.status ).subscribe(
      (data)=>
      {
        if (data["Done"] == true)
        {
          this.UpdateList();
        }
      }
    )
    
  }

  OrdersLoaded = false;

  UpdateList()
  {

    this.OrdersLoaded = false;
    this.http.get(this.GetOrdersUrl).subscribe((data) => {
      this.Orders = data;

      this.OrdersLoaded = true;

      for (let i = 0 ; i < this.Orders.length ;i++)
        {
          switch (this.Orders[i]['status'])
          {
            case "0": 
                      this.Orders[i]['status'] = "procceeding";
                      this.Orders[i]['statusColor'] = "blue";
                      break;


            case "1": this.Orders[i]['status'] = "Shipped";
                      this.Orders[i]['statusColor'] = "orange";
                      break;


            case "2": this.Orders[i]['status'] = "succeeded";
                      this.Orders[i]['statusColor'] = "green";
                      break;

            case "3": this.Orders[i]['status'] = "canceled";
                      this.Orders[i]['statusColor'] = "red";
                      break;
          }
        }

    })
  }

  cancelOrder(id) {

    this.status = 3;
    this.currentid = id;
    this.editOrder();

    // console.log(this.DeleteOrdersUrl + "?id=" + id);
    
    // this.http.get(this.DeleteOrdersUrl + "?id=" + id).subscribe((data) => {
    //   this.UpdateList();
    // })


  }

  setSelected(id)
  {
    this.currentid = id;
  }

}
