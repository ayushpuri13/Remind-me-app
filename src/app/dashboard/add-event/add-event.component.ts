import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from 'src/app/Services/api.service';
import {NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

addEventForm:FormGroup;
min:any=null;
EditUser:any=null;


isDisabled:any=null;

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

     let timesplit=this.EditUser['event_time'].split(":");
      let Time={
        "hour":timesplit[0],
        "minute":timesplit[1],
        "second":timesplit[2]
      }
    let TimeS= JSON.stringify(Time)
    //   Time=JSON.parse('TimeS')

      console.log(Time);

      this.addEventForm.setValue({Title:this.EditUser['name'],
                                  Description:this.EditUser['description'],
                                  Time:Time,
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
this.min={year:year,
       month:month,
       date:date}
     let date1:NgbDate=new NgbDate(this.min.year,this.min.month,this.min.date);
      this.isDisabled =(date1:NgbDate,current:{month1:number})=>{date1.before({year:this.min.year,month:this.min.month,day:this.min.date})};

console.log(this.min)
    }
}
