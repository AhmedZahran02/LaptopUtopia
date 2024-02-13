import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ObjectToFormdataService } from '../Shared/object-to-formdata.service';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnChanges {




  initialErr = "this field is required";
  brands;       // get from db
  workfields = ["Laptop", "CPU", "GPU", "Memory", "HardDisk"];

  FieldsValue = [];
  validInput = [];
  ErrMsg = [];

  addProductURL = "https://laptoputopia.000webhostapp.com/backend/Product/addnewproduct.php";
  addLaptopURL = "https://laptoputopia.000webhostapp.com/backend/Product/addLAPTOP.php";
  addCPUURL = "https://laptoputopia.000webhostapp.com/backend/Product/addCPU.php";
  addGPUURL = "https://laptoputopia.000webhostapp.com/backend/Product/addGPU.php";
  addRamURL = "https://laptoputopia.000webhostapp.com/backend/Product/addRAM.php";
  addDriveURL = "https://laptoputopia.000webhostapp.com/backend/Product/addStorage.php";


  getBrandUrl = "https://laptoputopia.000webhostapp.com/backend/dashboard/getbrand.php";

  updateURL = ""

  @Input() editingProduct = null;

  subLaptop = null;
  subCPU = null;
  subGPU = null;
  subRam = null;
  subDrive = null;

  BrandsReceived = false;


  constructor(private dataConverter: ObjectToFormdataService, private http: HttpClient) {

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
    this.updateEditing();
  }


  ngOnInit(): void {

    for (let i = 0; i < 12; i++) {
      this.FieldsValue.push(null);
      this.validInput.push(false);
      this.ErrMsg.push(this.initialErr);
    }

    this.validInput[10] = true;
    this.ErrMsg[10] = "";

    this.FieldsValue[11] = 0;
    this.validInput[11] = true;
    this.ErrMsg[11] = "";

    this.updateEditing();
  }

  updateEditing()
  {
    
    if (this.editingProduct != null) {
      this.FieldsValue[0] = this.editingProduct.mid;
      this.FieldsValue[1] = this.editingProduct.title;
      this.FieldsValue[2] = this.editingProduct.price;
      this.FieldsValue[3] = this.editingProduct.body;
      this.FieldsValue[4] = this.editingProduct.quantity;
      this.FieldsValue[5] = this.editingProduct.imageurls[0];
      this.FieldsValue[6] = this.editingProduct.imageurls[1];
      this.FieldsValue[7] = this.editingProduct.imageurls[2];
      this.FieldsValue[8] = this.editingProduct.imageurls[3];
      this.FieldsValue[9] = this.editingProduct.imageurls[4];
      this.FieldsValue[10] = this.editingProduct.brandname;
      this.FieldsValue[11] = this.editingProduct.workfield;
      
      console.log(this.FieldsValue);


      if (this.editingProduct.workfield == 0) {
        this.subLaptop =
        {
          'modelname': this.editingProduct.modelname,
          'os': this.editingProduct.os,
          'displaytype': this.editingProduct.displaytype,
          'fingerprint': this.editingProduct.fingerprint,
          'weight': this.editingProduct.weight,
          'webcam': this.editingProduct.webcam,
          'webcamquality': this.editingProduct.webcamquality,
          'displayhz': this.editingProduct.displayhz,
          'batterycapacity': this.editingProduct.batterycapacity,
          'ports': this.editingProduct.ports,
          'touchscreen': this.editingProduct.touchscreen,
          'cpuid': this.editingProduct.cpuid,
          'gpuid': this.editingProduct.gpuid,
          'storageid': this.editingProduct.storageid,
          'ramid': this.editingProduct.ramid
        };
      }

      if (this.editingProduct.workfield == 1) {
        this.subCPU =
        {
          'subbrand': this.editingProduct.subbrand,
          'brandmodifier': this.editingProduct.brandmodifier,
          'skunumber': this.editingProduct.skunumber,
          'cores': this.editingProduct.numberofcores,
          'threads': this.editingProduct.numberofthreads,
          'clock': this.editingProduct.clockspeed,
          'cache': this.editingProduct.cache
        };
      }

      if (this.editingProduct.workfield == 2) {
        this.subGPU =
        {
          'subbrand': this.editingProduct.subbrand,
          'brandmodifier': this.editingProduct.brandmodifier,
          'skunumber': this.editingProduct.skunumber,
          'vram': this.editingProduct.vram,
          'generation': this.editingProduct.generation
        }
      }

      if (this.editingProduct.workfield == 3) {
        this.subRam =
        {
          'generation': this.editingProduct.generation,
          'writespeed': this.editingProduct.writespeed,
          'readspeed': this.editingProduct.readspeed,
          'capacity': this.editingProduct.capacity
        }
      }

      if (this.editingProduct.workfield == 4) {
        this.subDrive =
        {
          'type': this.editingProduct.type,
          'writespeed': this.editingProduct.writespeed,
          'readspeed': this.editingProduct.readspeed,
          'capacity': this.editingProduct.capacity,
          'color': this.editingProduct.color
        }
      }

      for (let i = 0; i < 12; i++) {
        this.validInput[i] = true;
        this.ErrMsg[i] = "";
      }
    }

    let x = { "workfield": this.FieldsValue[11] };

    let y = this.dataConverter.convertToFormData(x);

    this.BrandsReceived = false;
    this.http.post(this.getBrandUrl, y).subscribe((data) => {
      this.BrandsReceived = true;
      this.brands = data;
      if (this.editingProduct == null) {
        this.FieldsValue[10] = this.brands[0];
      }
    });
  }

  // Validations



  allValid = false;
  received = false;
  validRecieved = false;


  isAlpha(char) {
    return ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'))
  }

  isNumber(Num) {
    return (Num >= '0' && Num <= '9');
  }

  validateID() {
    let ID: String = this.FieldsValue[0];
    for (let i = 0; i < ID.length; i++) {
      if (!(this.isAlpha(ID[i]) || this.isNumber(ID[i]))) {
        return false;
      }
    }
    return true;
  }

  validatePrice() {
    let Price: number = this.FieldsValue[2];

    return Price > 0;
  }

  validateAmount() {
    let Amount: number = this.FieldsValue[4];

    return Amount > 0;
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

    if (id == 0) {
      let A = this.validateID();
      if (!A) {
        this.validInput[0] = false;
        this.ErrMsg[0] = "ID Cannot Contain Symbols"
      }
    }

    if (id == 2) {
      let A = this.validatePrice();
      if (!A) {
        this.validInput[2] = false;
        this.ErrMsg[2] = "Price be greater than 0";
      }
    }

    if (id == 4) {
      let A = this.validateAmount();
      if (!A) {
        this.validInput[4] = false;
        this.ErrMsg[4] = "Amount be greater than 0";
      }
    }


    this.setAllValid();

  }

  revalidate() {
    this.allValid = false;
    this.validRecieved = false;


    let x = { "workfield": this.FieldsValue[11] };

    let y = this.dataConverter.convertToFormData(x);


    this.http.post(this.getBrandUrl, y).subscribe((data) => {
      this.brands = data;
      this.FieldsValue[10] = this.brands[0];

    });

  }

  setAllValid() {
    this.allValid = true;
    for (let i = 0; i < 10; i++) {
      this.allValid = this.allValid && this.validInput[i];
    }
    this.allValid = this.allValid && this.validRecieved;
  }

  childProduct;

  receive(Arr: Array<any>) {
    this.received = true;
    this.validRecieved = Arr[1];
    this.setAllValid();
    this.childProduct = Arr[0];
    this.allValid = this.allValid && Arr[1];
  }


  submit() {
    let iurl = this.FieldsValue[5] + '$' + this.FieldsValue[6] + '$' + this.FieldsValue[7] + '$' + this.FieldsValue[8] + '$' + this.FieldsValue[9]; 
    let wf = 0;


    let Product =
    {
      'mid': this.FieldsValue[0],
      'brandname': this.FieldsValue[10],
      'workfield': this.FieldsValue[11],
      'title': this.FieldsValue[1],
      'price': this.FieldsValue[2],
      'body': this.FieldsValue[3],
      'quantity': this.FieldsValue[4],
      'imagesurls': iurl,
      'discount': 0
    }

    let ProductRequest = this.dataConverter.convertToFormData(Product);


    let subProd;
    if (this.FieldsValue[11] == 0) {
      subProd =
      {
        'mid': this.FieldsValue[0],
        'modelname': this.childProduct[0],
        'os': this.childProduct[1],
        'displaytype': this.childProduct[2],
        'fingerprint': this.childProduct[3],
        'weight': this.childProduct[4],
        'webcam': this.childProduct[5],
        'webcamquality': this.childProduct[6],
        'displayhz': this.childProduct[7],
        'batterycapacity': this.childProduct[8],
        'ports': this.childProduct[9],
        'touchscreen': this.childProduct[10],
        'cpuid': this.childProduct[11],
        'gpuid': this.childProduct[12],
        'storageid': this.childProduct[14],
        'ramid': this.childProduct[13]
      }
    }
    if (this.FieldsValue[11] == 1) {
      subProd =
      {
        'mid': this.FieldsValue[0],
        'subbrand': this.childProduct[0],
        'brandmodifier': this.childProduct[1],
        'skunumber': this.childProduct[2],
        'numberofcores': this.childProduct[3],
        'numberofthreads': this.childProduct[4],
        'clockspeed': this.childProduct[5],
        'cache': this.childProduct[6],
      }
    }
    if (this.FieldsValue[11] == 2) {
      subProd =
      {
        'mid': this.FieldsValue[0],
        'subbrand': this.childProduct[0],
        'brandmodifier': this.childProduct[1],
        'skunumber': this.childProduct[2],
        'vram': this.childProduct[3],
        'generation': this.childProduct[4]
      }
    }
    if (this.FieldsValue[11] == 3) {
      subProd =
      {
        'mid': this.FieldsValue[0],
        'generation': this.childProduct[0],
        'writespeed': this.childProduct[1],
        'reedspeed': this.childProduct[2],
        'capacity': this.childProduct[3]
      }
    }
    if (this.FieldsValue[11] == 4) {
      subProd =
      {
        'mid': this.FieldsValue[0],
        'type': this.childProduct[0],
        'writespeed': this.childProduct[1],
        'readspeed': this.childProduct[2],
        'capacity': this.childProduct[3],
        'color': this.childProduct[4]
      }
    }

    let subproductForm = this.dataConverter.convertToFormData(subProd);




    if (this.editingProduct == null)    // adding
    {
      console.log("Here");
      
      this.http.post(this.addProductURL, ProductRequest).subscribe((data) => {
        if (data[0]['done'] == 1) {
          if (Product.workfield == 0) {
            this.http.post(this.addLaptopURL, subproductForm).subscribe((data2) => {
              if (data2[0]["done"] == 1)
              {
                alert("Done");
              }
              else
              {
                alert("failed");
              }

            })
          }
          if (Product.workfield == 1) {
            console.log("subProd");
            this.http.post(this.addCPUURL, subproductForm).subscribe((data2) => {
              if (data2[0]["done"] == 1)
              {
                alert("Done");
              }
              else
              {
                alert("failed");
              }
            })
          }
          if (Product.workfield == 2) {
            this.http.post(this.addGPUURL, subproductForm).subscribe((data2) => {
              if (data2[0]["done"] == 1)
              {
                alert("Done");
              }
              else
              {
                alert("failed");
              }
            })
          }
          if (Product.workfield == 3) {
            this.http.post(this.addRamURL, subproductForm).subscribe((data2) => {
              if (data2[0]["done"] == 1)
              {
                alert("Done");
              }
              else
              {
                alert("failed");
              }
            })
          }
          if (Product.workfield == 4) {
            this.http.post(this.addDriveURL, subproductForm).subscribe((data2) => {
              if (data2[0]["done"] == 1)
              {
                alert("Done");
              }
              else
              {
                alert("failed");
              }
            })
          }
        }

      })


    }

    else {
      // To Be Added The Editing Part
    }
  }


}
