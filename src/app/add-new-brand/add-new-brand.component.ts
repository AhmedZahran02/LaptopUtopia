import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.css']
})
export class AddNewBrandComponent {

  initialErr = "this field is required";
  addBrandURL = "https://laptoputopia.000webhostapp.com/backend/Product/addBrand.php";
  FieldsValue = [];
  validInput = [];
  ErrMsg = [];

  Workfields = [
  {
    'mid' : 0,
    'title' : "Laptop"
  },
  {
    'mid' : 1,
    'title' : "CPU"
  },
  {
    'mid' : 2,
    'title' : "GPU"
  },
  {
    'mid' : 3,
    'title' : "Ram"
  },
  {
    'mid' : 4,
    'title' : "Hard Disk"
  }
];



  constructor(private http: HttpClient) {
    for (let i = 0; i < 2; i++) {
      this.FieldsValue.push(null);
      this.validInput.push(false);
      this.ErrMsg.push(this.initialErr);
    }
    this.validInput[1] = true;
    this.ErrMsg[1] = "";
    this.FieldsValue[1] = 0;
  }

  // Validations

  allValid = false;

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

    

    if (id == 0)
    {
      let x = "";
      x = this.FieldsValue[0];
      for (let i = 0 ; i < x.length; i++)
      {
        if ((x[i] >= 'a' && x[i] < 'z') || (x[i] >= 'A' && x[i] <= 'Z'))
        {
          continue;
        }
        else
        {
          this.validInput[0] = false;
          this.ErrMsg[0] = "Only Letters";
          break;
        }
      }

    }

    this.setAllValid();
  }

  setAllValid()
  {
    this.allValid = true;
    for (let i = 0; i < 2; i++) {
      this.allValid = this.allValid && this.validInput[i];
    }
  }




  submit() {
    if (!this.allValid) return;

    let newBrand = new FormData();
    newBrand.append('name', this.FieldsValue[0]);
    newBrand.append('workfield',this.FieldsValue[1]);
    this.http.post(this.addBrandURL,newBrand).subscribe((data)=>{console.log(data);})
  }
}
