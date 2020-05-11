import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm:FormGroup;
  isLoggedInFlag:any;

error:string;



  constructor(private auth:AuthService, private router :Router) { }

  ngOnInit() {
    this.isLoggedIn();
    this.initsignupForm();
    
  }


  initsignupForm(){
    this.signupForm=new FormGroup({
      FirstName:new FormControl('',Validators.required),
      LastName:new FormControl('',Validators.required),
      Contact:new FormControl('',[Validators.required,Validators.minLength(10)]),
      Email:new FormControl('',[Validators.required,Validators.email]),
      Password:new FormControl('',[Validators.required,Validators.minLength(8)])
  
    });
  
  }


OnSubmit(){
  console.log(this.signupForm.value);
this.auth.signup(this.signupForm.value);
this.initsignupForm();
}

isLoggedIn(){
  
  if (this.auth.isLoggedIn == true){
    this.router.navigate(['dashboard']);
  }
}

}
