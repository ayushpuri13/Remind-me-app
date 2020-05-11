import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  // Email=new FormControl('',Validators.required);
  // Password=new FormControl('',Validators.required);


loginForm:FormGroup;


  constructor(private auth:AuthService) { }

  ngOnInit() {
  this.initloginForm();
  }

initloginForm(){

    this.loginForm=new FormGroup({
      Email: new FormControl('',Validators.required),
      Password: new FormControl('',Validators.required)
    });
  }
  

  OnSubmit(){
    console.log(this.loginForm.value);
this.auth.login(this.loginForm.value['Email'],this.loginForm.value['Password']);
this.initloginForm();

  }
 
}
