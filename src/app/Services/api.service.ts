import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl:any='https://remind-me-backend.herokuapp.com';

  constructor(private http : HttpClient,
              private toastr : ToastrService,
              private router:Router
              ) { }

ChangePasswordApi(NewPass:string,OldPass:string){
  let current_password=OldPass;
  let new_password=NewPass;
return this.http.post<any>(this.apiUrl + '/api/v1/auth/password_change',{current_password,new_password}).subscribe(
  err=>{
    if(err){
      this.toastr.error('',err.error.flashback_message)
    }
else {
  this.toastr.success('','Password changed successfully')
}    
  }
  
)
}

ForgotPasswordApi(email:string){
  return this.http.post(this.apiUrl + '/api/v1/auth/password_reset',{email}).subscribe(res=>{
    if(res){
      this.toastr.success('Email Sent!!');
      this.router.navigate(['login']);
    }
  },
  err=>{
    console.log(err);
    if(err){
      this.toastr.error(err.error.flashback_message,'');
    }
  }
  
  )
}


}
