import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  FieldsValue = new Array<any>();
  ErrMsg = new Array<any>();
  validInput = new Array<any>();

  allValid = false;


  addAdminUrl = "https://laptoputopia.000webhostapp.com/backend/User/register.php";


  constructor(private http:HttpClient, private dataConv : ObjectToFormdataService) { 
    this.FieldsValue.length = 9;
    this.ErrMsg.length = 8;
    this.validInput.length = 8;

    this.ErrMsg.fill("This Field Is Required");
    this.FieldsValue.fill("");
    this.validInput.fill(false);
  }

  ngOnInit(): void {
  }


  AddAdmin()
  {
    let admin = {
      'isAdmin' : '1',
      'username' : this.FieldsValue[0],
      'firstname' : this.FieldsValue[1],
      'lastname' : this.FieldsValue[2],
      'email' : this.FieldsValue[3],
      'password' : this.FieldsValue[4],
      'phone' : this.FieldsValue[5],
      'dateofbirth' : this.FieldsValue[6],
      'startedworkat' : this.FieldsValue[7],
      'owner' : "0",
      'image' : this.FieldsValue[8]
    }

    let Request = this.dataConv.convertToFormData(admin);

    console.log(admin);
    

    this.http.post(this.addAdminUrl,Request).subscribe(
      (data)=>
      {
        console.log(data);
        
      }
    )
    
  }



  // Validations ===>
  
  passwordConstraints = [false,false,false,false];

  onlyNumbers(id,x)
  {
    if (id != 5 ) return;
    

    for (let i = 0; i < x.length ;i++)
    {
      if ((x[i] >= '0' && x[i] <= '9') || (x[i] == '.')) continue;

      this.validInput[id] = false;
      this.ErrMsg[id] = "Only Numbers Is Applied";
      return;
    }
  }

  onlyAlphabet(id,x)
  {
    if (id != 1 && id != 2) return;

    for (let i = 0; i < x.length ;i++)
    {
      if ((x[i] >= 'a' && x[i] <= 'z') || (x[i] >= 'A' && x[i] <= 'Z') || x[i] == ' ') continue;

      this.validInput[id] = false;
      this.ErrMsg[id] = "Only Alphabet Is Applied";
      return;
    }
  }

  
  validatePassword()
  {
      let X : String = this.FieldsValue[4];

      console.log(X);
      

      for (let i = 0; i < 4 ; i++)
      {
        this.passwordConstraints[i] = false;
      }

      for (let i = 0; i < X.length; i++)
      { 
        if (X[i] >='A' && X[i] <= 'Z')
        {
          this.passwordConstraints[3] = true;
        }

        if (X[i] >='0' && X[i] <= '9')
        {
          this.passwordConstraints[1] = true;
          
        }

        if (X[i] == '@' || X[i] == "_" || X[i] == '-' || X[i] == '#' || X[i] == '$')
        {
          this.passwordConstraints[4] = true;
          
        }
      }

      if (this.passwordConstraints[1] == false) 
      this.ErrMsg[4] = "password must contain Number"

      if (this.passwordConstraints[4] == false) 
      this.ErrMsg[4] = "password must contain Special Character"

      if (this.passwordConstraints[3] == false) 
        this.ErrMsg[4] = "password must contain Capital Letter";

      this.validInput[4] = this.passwordConstraints[1] && this.passwordConstraints[3] && this.passwordConstraints[4];
  }

  
  EmailConstraints = false;

  validateEmail(id)
  {
    if (id != 3) return;

    let x = this.FieldsValue[id].indexOf('@');
    let y = this.FieldsValue[id].indexOf('.');

    this.validInput[id] = false;

    if ( x > 0 && y > 0 && y != this.FieldsValue[id].length - 1 && x < y)
    {
      for (let i = 0; i < this.FieldsValue[id].length; i++)
      {
        if (this.FieldsValue[i] != '@' && this.FieldsValue[i] != '.')
        {
          this.validInput[id] = true;
        }
      }
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
    this.onlyAlphabet(id,this.FieldsValue[id]);
    this.validatePassword();
    this.validateEmail(id);

    this.setAllValid();
  }

  setAllValid() {

    this.allValid = true;
    for (let i = 0; i < 8; i++) {
      this.allValid = this.allValid && this.validInput[i];
    }

  }

}
