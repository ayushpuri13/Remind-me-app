import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl:any='https://remind-me-backend.herokuapp.com';
  UserEventList:any=[];
  EditEvent:string=null;

  constructor(private http : HttpClient,
              private toastr : ToastrService,
              private router:Router
              ) {

               }

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


ResetPassword(token,new_password){
  return this.http.post(this.apiUrl + '/api/v1/auth/password_reset_confirm',{token,new_password}).subscribe(res=>{
    if(res){
      this.toastr.success('Password successfully changed');
      this.router.navigate(['login']);
    }
  },
  err=>{
    console.log(err);
    if(err){
      this.toastr.error(err.error.flashback_message,'Invalid');
      this.router.navigate(['login']);
    }
  }

  )

}

// -----------------------------------------Events Api ----------------------------------

addEventApi(form){
  console.log(form);


  let post={
    name:form.Title,
    description:form.Description,
    event_date:form.Date,
    event_time:form.Time + ":00 " ,
    set_reminder:form.Reminder

  }
console.log(post)

 return this.http.post(this.apiUrl + '/api/v1/events',post).subscribe(data=>{
    console.log(data);
    this.toastr.success('Event Added','');
  },
  err=>{
    console.log(err);
    this.toastr.error(err.error.flashback_message,'');
  }
  )

}


getEventList(){
  return this.http.get(this.apiUrl + '/api/v1/events').subscribe(
    data=>{
      if(data){
        console.log(data);
        this.UserEventList=data;
      }
    }
  )
}


UpdateEvent(form){
  let post={
    name:form.Title,
    description:form.Description,
    event_date:form.Date,
    event_time:form.Time + ":00",
    set_reminder:form.Reminder

  }
console.log(post)

  this.http.patch(this.apiUrl + '/api/v1/events/' + this.EditEvent['id'],post).subscribe(data=>{
    console.log(data);
    this.toastr.success('Event updated successfully','');
    this.getEventList();
  },
  err=>{
    console.log(err);
    this.toastr.error(err.error.flashback_message,'');
  })

}


DeleteEvent(Id){
  console.log(Id)
  console.log(this.apiUrl + '/api/v1/events/' + Id);
  this.http.delete(this.apiUrl + '/api/v1/events/' + Id).subscribe(data=>{
    this.toastr.success('Event deleted successfully','')
    console.log(data);
  },
  err=>{
    console.log(err);
    this.toastr.error(err.error.flashback_message,'');
  })


}

}
