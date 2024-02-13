import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DecryptImagesService } from '../Shared/decrypt-images.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  editIcon = faEdit;
  deleteIcon = faTrash;
  show = 0;

  FieldsValue = new Array<any>();
  ErrMsg = new Array<any>();
  validInput = new Array<any>();

  GetProductUrl = "https://laptoputopia.000webhostapp.com/backend/Product/listAll.php";
  DeleteProductUrl = "https://laptoputopia.000webhostapp.com/backend/Product/deleteProduct.php";
  updateProducturl = "https://laptoputopia.000webhostapp.com/backend/Product/updateProduct.php";


  ProductsLoaded = true;

  workField = -1;

  ProductImagesArr = [];

  getAllProducts()
  {
    
      this.ProductsLoaded = false;
    
      this.http.get(this.GetProductUrl + "?workField=" + this.workField).subscribe((data)=>{
        this.ProductsLoaded= true;
        this.Products = data;

        this.ProductImagesArr = [];

        for (let i = 0 ; i < this.Products.length; i++)
        {
          let imageurl = this.Products[i]['imageurls'];
          let ImagesArr = this.Decrypter.getImagesArray(imageurl);
          this.ProductImagesArr.push(ImagesArr[0]);
        }
        
      })
  }

  @Output() Sender = new EventEmitter();

  constructor(private http: HttpClient, private Decrypter: DecryptImagesService, private Converter : ObjectToFormdataService) { 
    this.FieldsValue.length = 9;
    this.ErrMsg.length = 9;
    this.validInput.length = 9;

    this.ErrMsg.fill("");
    this.FieldsValue.fill("");
    this.validInput.fill(true);
  }

  ngOnInit(): void {
  }

  Products;

  currentEditing = null;

  editProduct(toEdit)
  {
    this.currentEditing = toEdit;

    let ArrImages = this.Decrypter.getImagesArray(toEdit.imageurls);

    this.FieldsValue[0] = toEdit.body;
    this.FieldsValue[1] = toEdit.title;
    this.FieldsValue[2] = toEdit.price;
    this.FieldsValue[3] = toEdit.quantity;
    this.FieldsValue[4] = ArrImages[0];
    this.FieldsValue[5] = ArrImages[1];
    this.FieldsValue[6] = ArrImages[2];
    this.FieldsValue[7] = ArrImages[3];
    this.FieldsValue[8] = ArrImages[4];

    this.validInput.fill(true);
    this.ErrMsg.fill("");
    
  }

  deleteProduct(mid)
  {
    this.http.get(this.DeleteProductUrl + "?mid=" + mid).subscribe((data)=>{console.log(data);});

    for (let i = 0 ; i < this.Products.length; i++)
    {
      if (this.Products[i].mid == mid)
      {
        this.Products.splice(i,1);
      }
    }
  }


  updateProduct()
  {
    let Product = {
      'mid' : this.currentEditing.mid,
      'body' : this.FieldsValue[0],
      'title' : this.FieldsValue[1],
      'price' : this.FieldsValue[2],
      'quantity' : this.FieldsValue[3],
      'imageurls' : this.FieldsValue[4] + '$' + this.FieldsValue[5] + '$' + this.FieldsValue[6] + '$' + this.FieldsValue[7] + '$' + this.FieldsValue[8]
    };

    let y = this.Converter.convertToFormData(Product);

    this.http.post(this.updateProducturl,y).subscribe(
      (data)=>
      {
        console.log(data);
        
        this.getAllProducts();
        
      }
    )


  }


  // Validations ====>

  allValid = true;
  


  onlyNumbers(id,x)
  {
    if (id != 2 && id != 3) return;
    

    for (let i = 0; i < x.length ;i++)
    {
      if ((x[i] >= '0' && x[i] <= '9') || (x[i] == '.')) continue;

      this.validInput[id] = false;
      this.ErrMsg[id] = "Only Numbers Is Applied";
      return;
    }
  }


  ValidateControl(id, controller) {
    if (controller.control.errors) {
      if (controller.control.errors.required)
        this.ErrMsg[id] = "this field is required";
      else if (controller.control.errors.minlength)
        this.ErrMsg[id] = controller.name + " must be at least " + controller.control.errors.minlength.requiredLength;

      this.validInput[id] = false;
    }
    else {
      this.validInput[id] = true;
    }
    this.onlyNumbers(id,this.FieldsValue[id]);
    // numerical inputs
    if (id == 4 && this.validInput[id] == true)
    {
      if (this.FieldsValue[id] <= 0)
      {
        this.validInput[id] = false;
        this.ErrMsg[id] = controller.name + " must be greater than 0"
      }

    }

    this.setAllValid();
  }

  setAllValid() {

    this.allValid = true;
    for (let i = 0; i < 7; i++) {
      this.allValid = this.allValid && this.validInput[i];
    }

  }


}
