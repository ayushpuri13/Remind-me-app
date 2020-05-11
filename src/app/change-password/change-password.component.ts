import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changepasswordForm:FormGroup;




  constructor(private toastr :ToastrService,private api :ApiService) { }

  ngOnInit() {
  this.initchangepassForm();
  }

  initchangepassForm(){

  this.changepasswordForm=new FormGroup({
OldPassword:new FormControl('',[Validators.required,Validators.minLength(8)]),
NewPassword:new FormControl('',[Validators.required,Validators.minLength(8)]),
ConfirmPassword:new FormControl('',[Validators.required,Validators.minLength(8)])
  });
}




  OnSubmit(){
    console.log(this.changepasswordForm.value);
if(this.changepasswordForm.value.NewPassword!==this.changepasswordForm.value.ConfirmPassword){
  this.toastr.error('New Password and Confirm Password does not match','');
  this.initchangepassForm();
  return;
  
}
else
{
  this.api.ChangePasswordApi(this.changepasswordForm.value.NewPassword,this.changepasswordForm.value.OldPassword)
  this.initchangepassForm();
}


  }
}
