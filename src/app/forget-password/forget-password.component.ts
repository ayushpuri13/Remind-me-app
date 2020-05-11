import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../Services/api.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

 
  
forgetpasswordForm:FormGroup;

  constructor(private api :ApiService) { }

  ngOnInit() {
    this.initforgotpassForm();
  }

  initforgotpassForm(){
  this.forgetpasswordForm=new FormGroup({
   Email:new FormControl('',Validators.required) 
    
        });
      }

      OnSubmit(){
        console.log(this.forgetpasswordForm.value);
this.api.ForgotPasswordApi(this.forgetpasswordForm.value.Email);
        this.initforgotpassForm();
      }

}
