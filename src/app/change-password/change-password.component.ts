import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

OldPassword:FormControl=new FormControl('',[Validators.required,Validators.minLength(4)]);
NewPassword:FormControl=new FormControl('',[Validators.required,Validators.minLength(4)]);
ConfirmPassword:FormControl=new FormControl('',[Validators.required,Validators.minLength(4)]);

  constructor() { }

  ngOnInit() {
  }

  changepasswordForm=new FormGroup({
OldPassword:this.OldPassword,
NewPassword:this.NewPassword,
ConfirmPassword:this.ConfirmPassword
  });

  OnSubmit(){
    console.log(this.changepasswordForm.value);
  }
}
