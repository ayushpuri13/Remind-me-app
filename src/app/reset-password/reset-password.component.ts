import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ApiService } from '../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  resetpasswordForm:FormGroup
  


  constructor(private auth :AuthService,
    private api :ApiService,
    private toastr:ToastrService,
    private router :Router ) 
     {
         if(!this.auth.redirectedToken){
            this.router.navigate(['login']);
     }
   }

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
        if(this.resetpasswordForm.value.NewPassword==this.resetpasswordForm.value.ConfirmPassword){
        this.api.ResetPassword(this.auth.redirectedToken,this.resetpasswordForm.value.NewPassword);
        }
        else
        {
          this.toastr.error('Passwords does not match','');
        }
        this.initresetpassForm();
      }


}
