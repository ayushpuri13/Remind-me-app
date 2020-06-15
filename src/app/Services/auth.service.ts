import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User.model';
import { SignupComponent } from '../signup/signup.component';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:any='https://remind-me-backend.herokuapp.com';
  currentUserEmail:string;
  isVerified:boolean;
  redirectedToken:string=null;
  currentUserName:string;

  constructor(private httpClient:HttpClient,
              private router :Router,
              private toastr:ToastrService,
              private api : ApiService
              ) {}

  login(email:string,password:string){
    console.log(this.apiUrl + '/api/v1/auth/login', {email, password});
 return this.httpClient.post<any>(this.apiUrl + '/api/v1/auth/login', {email, password}).subscribe(res => {
   if(res){
     console.log(res);
  localStorage.setItem('access_token',res.tokens['access']);
  localStorage.setItem('refresh_token',res.tokens['refresh']);
  this.toastr.success('Login Successful','');
  this.api.getEventList();
  this.isVerified=res.is_active;
  this.router.navigate(['dashboard']);
  this.currentUserEmail=email;
  this.currentUserName=res.first_name ;
}},
  error=>{
if(error){
  console.log(error.error.fallback_message);
this.toastr.error('',error.error['fallback_message']);
if(error.error.fallback_message=="You have already registered, but did not verify your email. Please verify your email"){
  this.isVerified=false;
  this.currentUserEmail=email;
    this.router.navigate(['verify-email']);
}

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
    let refresh=localStorage.getItem('refresh_token')
    this.httpClient.post(this.apiUrl + "/api/v1/auth/logout",{refresh});


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
    this.isVerified=res.is_active;
     if(this.isVerified){
       this.router.navigate(['verify-email'])
     }
   this.toastr.success('Please Verify Your Email!!','Registered Successfully')
   this.currentUserEmail=email;
this.api.getEventList();


 }
},
 (err:any)=>{
if(err){
  console.log(err)
  this.toastr.error('',err.error.fallback_message)
if(err.error.fallback_message=="You have already registered, but did not verify your email. Please verify your email"){
{
  this.isVerified=false;
  this.currentUserEmail=email;
  this.router.navigate(['verify-email']);
}
}
 }
  }
)
  }

  resendMail(){
    let email=this.currentUserEmail;
    this.httpClient.post(this.apiUrl +'/api/v1/auth/send_verification_link',{email}).subscribe(res=>
      {
        if(res){
          this.toastr.success('Email sent successfully','');
        }
      },
      err=>{
        console.log(err);
        this.toastr.error(err.error.fallback_message);
      })
  }

refreshToken(params:any)
{
  console.log('i m in auth ser:',params)
  let Tokens;

  return this.httpClient.post(this.apiUrl + '/api/v1/auth/refresh',params).pipe(tap(
    (tokens:any)=>{

    console.log(tokens)
    localStorage.setItem('access_token',tokens.access);
    localStorage.setItem('refresh_token',tokens.refresh);

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

ValidateEmailToken(){
  let token=this.redirectedToken;
  this.httpClient.post(this.apiUrl+ "/api/v1/auth/validate_register",{token}).subscribe((res:any)=>{
    if(res){
      console.log(res);
   localStorage.setItem('access_token',res.tokens['access']);
   localStorage.setItem('refresh_token',res.tokens['refresh']);
   this.toastr.success('','Email Verified Successfully');
   this.api.getEventList();
   this.isVerified=res.is_active;
   this.router.navigate(['dashboard']);
   this.currentUserEmail=res.email;
   this.currentUserName=res.first_name ;
 }},
   error=>{
 if(error){
   console.log(error.error.fallback_message);
 this.toastr.error('',error.error['fallback_message']);
 this.router.navigate(['register']);
 }
  })
}

}
