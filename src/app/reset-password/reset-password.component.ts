import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  resetpasswordForm:FormGroup
  


  constructor() { }

  ngOnInit() {
    this.initresetpassForm();
  }

  initresetpassForm(){
  this.resetpasswordForm=new FormGroup({
    
    NewPassword:new FormControl('',[Validators.required,Validators.minLength(4)]),
    ConfirmPassword:new FormControl('',[Validators.required,Validators.minLength(4)])
      });
    }

     
    
    OnSubmit(){
        console.log(this.resetpasswordForm.value);
        this.initresetpassForm();
      }


}
