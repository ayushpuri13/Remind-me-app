import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User.model';
import { SignupComponent } from '../signup/signup.component';
import { catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:any='https://remind-me-backend.herokuapp.com';
  currentUserEmail:string;

  constructor(private httpClient:HttpClient,
              private router :Router,
              private toastr:ToastrService
              ) { }

  login(email:string,password:string){
    console.log(this.apiUrl + '/api/v1/auth/login', {email, password});
 return this.httpClient.post<any>(this.apiUrl + '/api/v1/auth/login', {email, password}).subscribe(res => {
   if(res){
     console.log(res);
  localStorage.setItem('access_token',res.tokens['access']);
  localStorage.setItem('refresh_token',res.tokens['refresh']);
  this.toastr.success('Login Successful','');
  this.router.navigate(['dashboard']);
  this.currentUserEmail=email;
}},
  error=>{
if(error){
  console.log(error.error.fallback_message);
this.toastr.error('',error.error['fallback_message']);

  }}
  )
  }

  getToken(){
let access_token=localStorage.getItem('access_token');
return (access_token) ?  access_token :  null;
}

get isLoggedIn(){
  let access_token=localStorage.getItem('access_token');
  return (access_token!==null) ? true :false;
}

  logout(){
    let remove_access=localStorage.removeItem('access_token');
    let remove_refresh=localStorage.removeItem('refresh_token');
    if(remove_refresh==null && remove_access==null){
      this.router.navigate(['login']);
   } }
  
   signup(signupForm:any){
let email=signupForm.Email;
let password=signupForm.Password;
let first_name=signupForm.FirstName;
let last_name=signupForm.LastName;
let phone_number='+91' + signupForm.Contact;

console.log({email,password,first_name,last_name,phone_number});
return this.httpClient.post(this.apiUrl + '/api/v1/auth/register',{email,password,first_name,last_name,phone_number}).subscribe((res:any)=> {
  console.log(res)
  
  if(res){
    localStorage.setItem('access_token',res.tokens['access']);
    localStorage.setItem('refresh_token',res.tokens['refresh']);
     
   this.toastr.success('Registered Successfully','Please Verify Your Email!!')
   this.currentUserEmail=email;
   this.router.navigate(['dashboard']);

 }
},
 (err:any)=>{
if(err){
  console.log(err)
  this.toastr.error('',err.error.fallback_message)

 }
  }
)
  }
  
refreshToken(params:any) 
{
  console.log('i m in auth ser:',params)
  let Tokens;
  
  return this.httpClient.post(this.apiUrl + '/api/v1/auth/refresh',params).pipe(tap(
    (tokens:any)=>{
      
      localStorage.setItem('tokens',tokens)

    },
    error=>{
      console.log(error);
      if(error){
             this.logout();
             this.toastr.error('Session Timeout','Please Login Again!')
         }
        
    }
  ))
  
  // .pipe(catchError(err=>{

  //   console.log(err);
  //   if(err){
  //       this.logout();
  //       this.router.navigate(['login'])
  //   }
  
  
  // return throwError(err)
  // }))

  
}


}
