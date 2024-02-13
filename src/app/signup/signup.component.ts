import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faLock, faEye, faEyeSlash, faCheck, faXmark, faUser, faSignature, faAt, faPhone, faHome, faCity, faRoad, faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  initialErr = "this field is required";
  FieldsValue = [];
  validInput = [];
  ErrMsg = [];

  registerURL = "https://laptoputopia.000webhostapp.com/backend/User/register.php";
 
  constructor(private router: Router,private http: HttpClient, private toform: ObjectToFormdataService){

    for (let i = 0; i < 10; i++)
    {
      this.FieldsValue.push(null);
      this.validInput.push(false);
      this.ErrMsg.push(this.initialErr);
    }

  }



  //Icons
  passwordIcon = faLock;
  showPassword = faEye;
  hidePassword = faEyeSlash;
  correctSign = faCheck;
  wrongSign = faXmark;
  usernameIcon = faUser;
  nameIcon = faSignature;
  emailIcon = faAt;
  phoneIcon = faPhone;
  homeIcon = faHome;
  cityIcon = faCity;
  streetIcon = faRoad;
  houseIcon = faHouse;

  // Validations


   passwordConstraints = [false,false,false,false];
  EmailConstraints = false;
  PhoneConstraints = false;

  allValid = false;

  //Extras
  HidePassword = false;
  

  validatePassword()
  {
      let X : String = this.FieldsValue[4];

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
          this.passwordConstraints[2] = true;
        }
      }

      this.validInput[4] = this.passwordConstraints[1] && this.passwordConstraints[3] && this.passwordConstraints[2];
  }

  validateEmail()
  {
    let x = this.FieldsValue[2].indexOf('@');
    let y = this.FieldsValue[2].indexOf('.');

    this.EmailConstraints = false;

    if ( x > 0 && y > 0 && y != this.FieldsValue[2].length - 1 && x < y)
    {
      for (let i = 0; i < this.FieldsValue[2].length; i++)
      {
        if (this.FieldsValue[i] != '@' && this.FieldsValue[i] != '.')
        {
          this.EmailConstraints = true;
        }
      }
    }
  }

  validatePhone()
  {
    
    let x : String = this.FieldsValue[5];
    this.PhoneConstraints = true;
    for (let i = 0; i < x.length; i++)
    {
      if (x[i] < '0' || x[i] > '9')
      {
        this.PhoneConstraints = false;
      }
    }
  }

  ValidateControl(id,controller)
  {
     if (controller.control.errors)
     {
      if (controller.control.errors.required)
        this.ErrMsg[id] = "this field is required";
      else if (controller.control.errors.minlength)
        this.ErrMsg[id] = controller.name + " must be at least " + controller.control.errors.minlength.requiredLength;
  
        this.validInput[id] = false;
     }
     else
     {
      this.validInput[id] = true;
     }
     
     // Email Case
     if (id == 2)
     {
        if (!this.EmailConstraints)
        {
          this.validInput[2] = false;
          this.ErrMsg[2] = "Invalid Email Format";
        }
     }

     // password Case
     if (id == 4)
     {  
        this.passwordConstraints[0] = !controller.control.errors?.minlength;
        this.validInput[id] = this.validInput[id] && this.passwordConstraints[0] && this.passwordConstraints[1] && this.passwordConstraints[2] && this.passwordConstraints[3];
     }


     // Phone Case
     if (id == 5)
     {
        if (!this.PhoneConstraints)
        {
          this.validInput[5] = false;
          this.ErrMsg[5] = "This Field Should Only Contain Numbers"
        }
     }

     this.allValid = true;
     for (let i = 0 ; i < 10 ; i++)
     {
        this.allValid = this.allValid && this.validInput[i];
     }
  }


  // Event-triggered Actions

  DisplayPasswordConstraints()
  {
    document.getElementById('waitForClick').style['opacity'] = '1';
  }


  submit()
  {
      let newCustomer = { 
        'firstname': this.FieldsValue[0],
        'lastname': this.FieldsValue[1],
        'email': this.FieldsValue[2],
        'username': this.FieldsValue[3],
        'password': this.FieldsValue[4],
        'phone': this.FieldsValue[5],
        'dateofbirth': this.FieldsValue[9],
        'city': this.FieldsValue[6],
        'street': this.FieldsValue[7],
        'isAdmin': "0",
        'housenumber': this.FieldsValue[8],
        'image' : ''
      }

      let Request = this.toform.convertToFormData(newCustomer);

      console.log(newCustomer);
      

      this.http.post(this.registerURL,Request).subscribe((data)=>{
        console.log(data);
      })
  }

  navigateLogin()
  {
    document.getElementById('RegisterPage').style['animationName'] = 'ScaleOut';
    setTimeout(()=>{this.router.navigate(['home/login'])},2000);
  }
  
  goHome()
  {
    this.router.navigate(['home']);
  }
}
