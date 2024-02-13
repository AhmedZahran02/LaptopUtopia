import { ObjectToFormdataService } from './../Shared/object-to-formdata.service';
import { faLock, faEye, faEyeSlash, faHome } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Component, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faUser} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  validLogin = [false,false];
  FieldsValue = [null,null,null];
  ErrMsg = ["this field is required","this field is required"];

  @Input() isAdmin = false;

  // Icons
  usernameIcon = faUser;
  passwordIcon = faLock;
  showPassword = faEye;
  hidePassword = faEyeSlash;
  homeIcon = faHome;

  // Extras
  HidePassword = false;
  failedLogin = false;

  // login URL 
  url = "https://laptoputopia.000webhostapp.com/backend/User/login.php";

  constructor(private http:HttpClient , private router : Router, private toForm:ObjectToFormdataService,private Aroute: ActivatedRoute){
      
    Aroute.queryParamMap.subscribe((params)=>{
      
      if (params.has('isAdmin'))
      {
        this.isAdmin = params.get('isAdmin') == "1" ? true: false;
      }
      
    })

  }

  
  // Input Validators
  ValidateControl(id,controller)
  {
     if (controller.control.errors)
     {
      if (controller.control.errors.required)
        this.ErrMsg[id] = "this field is required";
      else if (controller.control.errors.minlength)
        this.ErrMsg[id] = controller.name + " must be at least " + controller.control.errors.minlength.requiredLength;
       
        console.log(this.ErrMsg[id]);
        this.validLogin[id] = false;
     }
     else
     {
      this.ErrMsg[id] = "";
      this.validLogin[id] = true;
     }  
  }




  // Event Triggered Functions
  Login()
  {
    this.failedLogin = false;
      let Check = {
      'username' : this.FieldsValue[0],
      'password' : this.FieldsValue[1],
      'isAdmin' : this.isAdmin ? "1" : "0"
      }

      let Request = this.toForm.convertToFormData(Check)
      this.http.post(this.url,Request).subscribe((data)=>
      {
          if (data[0]['Found'] == true)
          {
            sessionStorage.setItem('username',this.FieldsValue[0]);
            sessionStorage.setItem('isAdmin',Check.isAdmin);
            sessionStorage.setItem('isOwner',data[1]['owner']);
            console.log(data);
            
            this.router.navigate(['home']);
          }
          else
          {
            this.failedLogin = true;
          }
      });
  }

  TurnScreen()
  {
    document.getElementById('loginPage').style['animationName'] = 'ScaleOut';
    setTimeout(()=>{ this.router.navigate(['home/login/register']) }, 2000);
  }

  goHome()
  {
    this.router.navigate(['home']);
  }

  


}
