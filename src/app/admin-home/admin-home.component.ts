import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  FieldsValue = new Array<any>();
  ErrMsg = new Array<any>();
  validInput = new Array<any>();

  allValid = false;

  enableEditing = false;

  User;
  username = "username";
  loaded = false;

  canvas;
  ctx;
  labels = [0,1,2,3,4,5,6,7,8,9];
  dataCases = [0,1,2,3,4,5,6,7,8,9];

  

  getUserData = "https://laptoputopia.000webhostapp.com/backend/User/getAdminData.php";
  updateUserURL = "https://laptoputopia.000webhostapp.com/backend/User/updateUserData.php";

  getSignLogsurl = "https://laptoputopia.000webhostapp.com/backend/signlogs/getNumUsersInDay.php?date=";

  createLineChart()
  {
    this.http.get(this.getSignLogsurl).subscribe(
      (data : Array<any>)=>
      {
        console.log(data);
        
        this.labels = [];
        this.dataCases = [];
        for (let i = 0 ; i < data.length ; i++)
        {
          this.labels.push(data[i]["date"]);
          this.dataCases.push(data[i]["COUNT(*)"]);
        }

        this.canvas = document.getElementsByClassName('signlogs')[0];
        
        this.ctx = this.canvas.getContext('2d');
    
        let chart = new Chart(this.ctx,
          {
            type : 'bar',
            data: 
            {
              labels: this.labels,
              datasets: [{
                label: "Sign Logs",
                data: this.dataCases,
                backgroundColor: '#ffbb33',
                borderColor: '#ffbb33',
                fill: false,
                borderWidth:1
              }],
            }
          }
          )
      }
    )
  }


  constructor(private http:HttpClient, private Former : ObjectToFormdataService) { 
    this.FieldsValue.length = 3
    this.ErrMsg.length = 3
    this.validInput.length = 3

    this.ErrMsg.fill("")
    this.FieldsValue.fill("")
    this.validInput.fill(true)

  }

  ngOnInit(): void {
    this.createLineChart();

    this.http.get(this.getUserData + "?username=" + sessionStorage.getItem('username')).subscribe((data)=>{
      this.User = data;
      this.loaded = true;

      this.FieldsValue[0] = '********';
      this.FieldsValue[1] = data[0]["dateofbirth"];
      this.FieldsValue[2] = data[0]["phone"];
    })
  }


  updating = true;
  
  UpdateUser() {
    this.enableEditing = false;
    this.updating = false;

    let x = {
      'username' : sessionStorage.getItem('username'),
      'firstname' : this.User[0]['firstname'],
      'lastname' : this.User[0]['lastname'],
      'password' : this.FieldsValue[0],
      'phone' : this.FieldsValue[2],
      'email' : this.User[0]['email'],
      'startedworkat' : this.User[0]['startedworkat'],
      'dateofbirthe' : this.FieldsValue[1],
      'isAdmin' : "1"
    };


    let Request = this.Former.convertToFormData(x);

    this.http.post(this.updateUserURL,Request).subscribe(
      (data)=>
      {
        this.updating = true;
        console.log(data);
        
        alert("Updated Successfully");
      }
    )
  }



  onlyAlphabet(id,x)
  {
    if (id == 0 || id == 1 || id == 5 || id == 4) return;

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
    if (id != 2) return;
    

    for (let i = 0; i < x.length ;i++)
    {
      if (x[i] >= '0' && x[i] <= '9') continue;

      this.validInput[id] = false;
      this.ErrMsg[id] = "Only Numbers Is Applied";
      return;
    }
  }

  passwordConstraints = [false,false,false,false];

  validatePassword()
  {
      let X : String = this.FieldsValue[0];

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
      this.ErrMsg[0] = "password must contain Number"

      if (this.passwordConstraints[2] == false) 
      this.ErrMsg[0] = "password must contain Special Character"

      if (this.passwordConstraints[3] == false) 
        this.ErrMsg[0] = "password must contain Capital Letter";

      this.validInput[0] = this.passwordConstraints[1]&& this.passwordConstraints[3] && this.passwordConstraints[2];
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
    this.validatePassword();


    this.setAllValid();
  }

  setAllValid() {

    this.allValid = true;
    for (let i = 0; i < 3; i++) {
      this.allValid = this.allValid && this.validInput[i];
    }

  }


}
