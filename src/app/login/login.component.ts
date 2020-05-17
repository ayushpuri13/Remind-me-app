import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Email=new FormControl('',Validators.required);
  // Password=new FormControl('',Validators.required);


loginForm:FormGroup;


  constructor(private auth:AuthService,private route :ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.redirectTo();
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

redirectTo(){
  this.route.queryParams.subscribe(params => {
    console.log(params);
    if(params){
    if(params.action=='signup'){
      this.auth.redirectedToken=params.token;
      this.router.navigate(['verify-email']);
    }
    if(params.action=='reset_password'){
      this.router.navigate(['reset-password']);
      this.auth.redirectedToken=params.token;
    }}
  })
}

}
