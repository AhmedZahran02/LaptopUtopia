import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  pencilIcon = faPencil;
  binIcon = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  Products : Array<Object> = [
  {
    'title' : "Ram",
    'price' : 150,
    'amount' : 50
  },
  {
    'title' : "Laptop",
    'price' : 15000,
    'amount' : 10
  },
  {
    'title' : "Processor",
    'price' : 2000,
    'amount' : 5
  },
]

}
