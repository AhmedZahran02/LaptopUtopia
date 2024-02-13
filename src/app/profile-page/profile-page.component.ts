import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  enableEditing = false;

  FieldsValue = new Array<any>();
  ErrMsg = new Array<any>();
  validInput = new Array<any>();

  loaded = false;

  User;
  UserImage = "https://static.wikia.nocookie.net/p__/images/f/ff/Anya_Forger_Anime.png/revision/latest?cb=20220517151108&path-prefix=protagonist";
  username = sessionStorage.getItem('username')

  passwordConstraints = [false,false,false,false];
  allValid = false;

  getUserData = "https://laptoputopia.000webhostapp.com/backend/User/getUserData.php";
  updateUserURL = "https://laptoputopia.000webhostapp.com/backend/User/updateUserData.php";


  constructor(private http:HttpClient, private Former : ObjectToFormdataService) { 
    this.FieldsValue.length = 7
    this.ErrMsg.length = 7
    this.validInput.length = 7

    this.ErrMsg.fill("")
    this.FieldsValue.fill("")
    this.validInput.fill(true)
  }

  ngOnInit(): void {
    this.http.get(this.getUserData + "?username=" + sessionStorage.getItem('username')).subscribe((data)=>{
      this.User = data;
      this.UserImage = "url('" + data[0]['imageurl'] + "')";
      this.loaded = true;

      console.log(data);
      

      console.log(this.UserImage);
      

      this.FieldsValue[0] = this.User[0].firstname;
      this.FieldsValue[1] = this.User[0].lastname;
      this.FieldsValue[2] = '*******';
      this.FieldsValue[3] = this.User[0].phone;
      this.FieldsValue[4] = this.User[0].city;
      this.FieldsValue[5] = this.User[0].street;
      this.FieldsValue[6] = this.User[0].housenumber; 
    })
  }

  UpdateUser() {
    this.enableEditing = false;

    let x = {
      'username' : sessionStorage.getItem('username'),
      'firstname' : this.FieldsValue[0],
      'lastname' : this.FieldsValue[1],
      'password' : this.FieldsValue[2],
      'phone' : this.FieldsValue[3],
      'city' : this.FieldsValue[4],
      'street' : this.FieldsValue[5],
      'housenumber' : this.FieldsValue[6],
      'isAdmin' : "0"
    };

    let Request = this.Former.convertToFormData(x);

    this.http.post(this.updateUserURL,Request).subscribe(
      (data)=>
      {
          console.log(data);
          
      }
    )

  }

  onlyAlphabet(id,x)
  {
    if (!(id == 0 || id == 1 || id == 5 || id == 4)) return;

    for (let i = 0; i < x.length ;i++)
    {
      if ((x[i] >= 'a' && x[i] <= 'z') || (x[i] >= 'A' && x[i] <= 'Z')) continue;

      this.validInput[id] = false;
      this.ErrMsg[id] = "Only Alphabet Is Applied";
      return;
    }
  }

  onlyNumbers(id,x)
  {
    if (id != 3 && id != 6) return;
    

    for (let i = 0; i < x.length ;i++)
    {
      if (x[i] >= '0' && x[i] <= '9') continue;

      this.validInput[id] = false;
      console.log(x);
      
      this.ErrMsg[id] = "Only Numbers Is Applied";
      return;
    }
  }

  validatePassword()
  {
      let X : String = this.FieldsValue[2];

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

      if (this.passwordConstraints[1] == false) 
      this.ErrMsg[2] = "password must contain Number"

      if (this.passwordConstraints[2] == false) 
      this.ErrMsg[2] = "password must contain Special Character"

      if (this.passwordConstraints[3] == false) 
        this.ErrMsg[2] = "password must contain Capital Letter";

      this.validInput[2] = this.passwordConstraints[1]&& this.passwordConstraints[3] && this.passwordConstraints[2];
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

    this.onlyAlphabet(id,this.FieldsValue[id]);
    this.onlyNumbers(id,this.FieldsValue[id]);
    this.validatePassword();

    this.setAllValid();
  }

  setAllValid() {

    this.allValid = true;
    for (let i = 0; i < 7; i++) {
      this.allValid = this.allValid && this.validInput[i];
    }

  }


}
