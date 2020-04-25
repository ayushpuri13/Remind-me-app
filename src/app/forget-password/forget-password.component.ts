import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  NewPassword:FormControl=new FormControl('',[Validators.required,Validators.minLength(4)]);
  ConfirmPassword:FormControl=new FormControl('',[Validators.required,Validators.minLength(4)]);
  

  constructor() { }

  ngOnInit() {
  }
  forgetpasswordForm=new FormGroup({
    
    NewPassword:this.NewPassword,
    ConfirmPassword:this.ConfirmPassword
      });

      OnSubmit(){
        console.log(this.forgetpasswordForm.value);
      }

}
