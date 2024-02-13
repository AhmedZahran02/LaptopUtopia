import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-add-new-laptop',
  templateUrl: './add-new-laptop.component.html',
  styleUrls: ['./add-new-laptop.component.css']
})
export class AddNewLaptopComponent implements OnInit {

  @Input() subLaptop = null;
  @Output() sender = new EventEmitter();
  initialErr = "this field is required";

  FieldsValue = [];
  validInput = [];
  ErrMsg = [];

  CPUS;
  GPUS;
  Memories;
  Storages;

  
  getProcessorUrl = "https://laptoputopia.000webhostapp.com/backend/dashboard/getcpunames.php";
  getGPUUrl = "https://laptoputopia.000webhostapp.com/backend/dashboard/getgpunames.php";
  getRamUrl = "https://laptoputopia.000webhostapp.com/backend/dashboard/getramnames.php";
  getHardUrl = "https://laptoputopia.000webhostapp.com/backend/dashboard/getstoragenames.php";


  CpuReceived = false;
  GpuReceived = false;
  RamReceived = false;
  HardReceived = false;

  constructor(private http:HttpClient, private toform: ObjectToFormdataService) {
  }


  ngOnInit(): void {

    if (this.subLaptop != null) {
      this.FieldsValue[0] = this.subLaptop.modelname;
      this.FieldsValue[1] = this.subLaptop.os;
      this.FieldsValue[2] = this.subLaptop.displaytype;
      this.FieldsValue[3] = this.subLaptop.fingerprint;
      this.FieldsValue[4] = this.subLaptop.weight;
      this.FieldsValue[5] = this.subLaptop.webcam;
      this.FieldsValue[6] = this.subLaptop.webcamquality;
      this.FieldsValue[7] = this.subLaptop.displayhz;
      this.FieldsValue[8] = this.subLaptop.batterycapacity;
      this.FieldsValue[9] = this.subLaptop.ports;
      this.FieldsValue[10] = this.subLaptop.touchscreen;
      this.FieldsValue[11] = this.subLaptop.cpuid;
      this.FieldsValue[12] = this.subLaptop.gpuid;
      this.FieldsValue[13] = this.subLaptop.ramid;
      this.FieldsValue[14] = this.subLaptop.storageid;
    }
    

    for (let i = 0; i < 15; i++) {
      if (this.subLaptop != null)
      {
        this.validInput[i] = true;
        this.ErrMsg[i] = "";
        continue;
      }

      if (i < 11) {
        this.FieldsValue.push(null);
        this.validInput.push(false);
        this.ErrMsg.push(this.initialErr);
      }
      else {
        this.FieldsValue.push(null);
        this.validInput.push(true);
        this.ErrMsg.push("");
      }
    }
    this.FieldsValue[6] = "0";
    this.validInput[6] = true;
    this.ErrMsg[6] = "";

    this.http.get(this.getProcessorUrl).subscribe((data)=>
    {
      this.CPUS = data;
      this.CpuReceived = true;
    })

    this.http.get(this.getGPUUrl).subscribe((data)=>
    {
      this.GPUS = data;
      this.GpuReceived = true;
    })

    this.http.get(this.getRamUrl).subscribe((data)=>
    {
      this.Memories = data;
      this.RamReceived = true;
    })

    this.http.get(this.getHardUrl).subscribe((data)=>
    {
      this.Storages = data;
      this.HardReceived = true;
    })


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
    if (id >= 4 && id <= 8 && id != 5 && this.validInput[id] == true)
    {
      if (this.FieldsValue[id] <= 0)
      {
        this.validInput[id] = false;
        this.ErrMsg[id] = controller.name + " must be greater than 0"
      }

    }


    this.setAllValid();

    this.sender.emit([this.FieldsValue, this.allValid]);

  }

  setAllValid() {
    for (let i = 11; i < 15; i++) {
      if (this.FieldsValue[i] == null) {
        this.validInput[i] = false;
      }
      else {
        this.validInput[i] = true;
      }
    }


    this.allValid = true;
    for (let i = 0; i < 15; i++) {
      this.allValid = this.allValid && this.validInput[i];
    }

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
