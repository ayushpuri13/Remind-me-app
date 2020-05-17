import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

addEventForm:FormGroup;
min:any;
EditUser:any=null;


  constructor(private api : ApiService) {
this.SetMinDate();
  }

  ngOnInit() {
    this.initaddEventForm();
    if(this.api.EditEvent){
      this.EditForm();
       }
  }


  initaddEventForm(){
    this.addEventForm=new FormGroup({
      Title:new FormControl('',Validators.required),
      Description:new FormControl(''),
      Date:new FormControl('',[Validators.required,Validators.min(this.min)]),
      Time:new FormControl('',Validators.required),
      Reminder:new FormControl(true,Validators.required),
    })}

    OnSubmit(){
      this.api.addEventApi(this.addEventForm.value);
      this.initaddEventForm();
    }

    EditForm(){
       this.EditUser=this.api.EditEvent;
      console.log(this.EditUser);

      this.addEventForm.setValue({Title:this.EditUser['name'],
                                  Description:this.EditUser['description'],
                                  Time:this.EditUser['event_time'],
                                  Date:this.EditUser['event_date'],
                                  Reminder:this.EditUser['set_reminder']
    });
    }

    OnEditClick(){
      this.api.UpdateEvent(this.addEventForm.value);
      this.initaddEventForm();
    }


    SetMinDate(){
      let dt=new Date();
let year=dt.getFullYear();
let month =dt.getMonth();
let date=dt.getDate();
this.min=year+"-"+month+"-"+date;
console.log(this.min)
    }
}
