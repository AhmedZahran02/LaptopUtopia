import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-new-storage',
  templateUrl: './add-new-storage.component.html',
  styleUrls: ['./add-new-storage.component.css']
})
export class AddNewStorageComponent implements OnInit {

  @Input() subDrive = null;
  @Output() sender = new EventEmitter();
  initialErr = "this field is required";

  FieldsValue = [];
  validInput = [];
  ErrMsg = [];



  constructor() {
  }

  ngOnInit(): void {

    for (let i = 0; i < 5; i++) {
      this.FieldsValue.push(null);
      this.validInput.push(false);
      this.ErrMsg.push(this.initialErr);
    }

    if (this.subDrive != null)
    {
      this.FieldsValue[0] = this.subDrive.type;
      this.FieldsValue[1] = this.subDrive.writespeed;
      this.FieldsValue[2] = this.subDrive.readspeed;
      this.FieldsValue[3] = this.subDrive.capcity;
      this.FieldsValue[4] = this.subDrive.color;
      
      for (let i = 0; i < 5; i++) {
        this.validInput[i] = true;
        this.ErrMsg[i] = "";
      }
    }

  }

  // Validations

  allValid = false;
  selectedIndex = 0;
  selectedIndex2 = 0;



  validateColor() {
    let x = this.FieldsValue[4];
    for (let i = 0; i < x.length; i++) {
      if ((x[i] >= 'a' && x[i] <= 'z') || (x[i] >= 'A' && x[i] <= 'Z')) {
        continue;
      }
      return false;
    }
    return true;
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

    // numerical inputs
    if (id >= 1 && id < 4 && this.validInput[id] == true) {

      if (this.FieldsValue[id] <= 0) {
        this.validInput[id] = false;
        this.ErrMsg[id] = controller.name + " must be greater than 0"
      }
    }

    if (id == 4) {
      let A = this.validateColor();
      if (!A) {
        this.validInput[4] = false;
        this.ErrMsg[4] = controller.name + " Must Consist of alphabets only";
      }
    }



    this.allValid = true;
    for (let i = 0; i < 5; i++) {
      this.allValid = this.allValid && this.validInput[i];
    }


    this.sender.emit([this.FieldsValue, this.allValid]);

  }



  submit() {

  }

  navigateLogin() {
    document.getElementById('RegisterPage').style['animationName'] = 'ScaleOut';
    // setTimeout(()=>{this.router.navigate(['home/login'])},2000);
  }

  goHome() {
    // this.router.navigate(['home']);
  }


}
