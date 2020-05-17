import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-verify-screen',
  templateUrl: './verify-screen.component.html',
  styleUrls: ['./verify-screen.component.css']
})
export class VerifyScreenComponent implements OnInit {

  currentUserEmail:string;
  IsLoading:boolean=false;

  constructor(private auth :AuthService,
              private toastr:ToastrService,
              private router :Router,
              private api:ApiService)
   {this.isVerifiedUser(); 
  if(this.auth.redirectedToken){
    this.IsLoading=true;
    this.auth.ValidateEmailToken();
  }
  else {this.router.navigate(['login']);
    }
}

  ngOnInit() {
    this.currentUserEmail=this.auth.currentUserEmail;
  }


  isVerifiedUser(){
    if(this.auth.isVerified==true){
      this.router.navigate(['dashboard']);
     }

   
  }

  ResendEmail(){
    this.auth.resendMail();
  }
  

}
