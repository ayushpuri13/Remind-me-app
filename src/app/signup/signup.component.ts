import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  FirstName:FormControl=new FormControl('',Validators.required);
  LastName:FormControl=new FormControl('',Validators.required);
  Contact:FormControl=new FormControl('',[Validators.required,Validators.minLength(10)]);
  Email:FormControl=new FormControl('',[Validators.required,Validators.email]);
Password:FormControl=new FormControl('',[Validators.required,Validators.minLength(4)])

  signupForm=new FormGroup({
    FirstName:this.FirstName,
    LastName:this.LastName,
    Contact:this.Contact,
    Email:this.Email,
    Password:this.Password,

  });
  constructor() { }

  ngOnInit() {
  }
OnSubmit(){
  console.log(this.signupForm.value)
}

}
