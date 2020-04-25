import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
Email:FormControl=new FormControl('',Validators.required);
Password:FormControl=new FormControl('',Validators.required)

  loginForm=new FormGroup({
    Email:this.Email,
    Password:this.Password
  });
  


  constructor() { }

  ngOnInit() {
  }

  OnSubmit(){
    console.warn(this.loginForm.value);
  }
 
}
