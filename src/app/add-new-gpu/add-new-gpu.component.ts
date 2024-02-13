import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-new-gpu',
  templateUrl: './add-new-gpu.component.html',
  styleUrls: ['./add-new-gpu.component.css']
})
export class AddNewGPUComponent implements OnInit {

  @Input() subGPU = null;
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

    if (this.subGPU != null) {
      this.FieldsValue[0] = this.subGPU.subbrand;
      this.FieldsValue[1] = this.subGPU.brandmodifier;
      this.FieldsValue[2] = this.subGPU.skunumber;
      this.FieldsValue[3] = this.subGPU.vram;
      this.FieldsValue[4] = this.subGPU.generation;

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
    if (id >= 3 && id < 4 && this.validInput[id] == true) {

      if (this.FieldsValue[id] <= 0) {
        this.validInput[id] = false;
        this.ErrMsg[id] = controller.name + " must be greater than 0"
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
