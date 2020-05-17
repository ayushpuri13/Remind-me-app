import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../Services/api.service';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {



  UserEventList:any=[];

  constructor( private api :ApiService) {
    this.api.getEventList();

   }

  ngOnInit() {
    this.UserEventList=this.api.UserEventList;
    console.log(this.UserEventList);

  }

  Edit(Event,i){
    console.log(Event,i)
    if(this.UserEventList[i].name==Event.name){
      this.api.EditEvent=this.UserEventList[i];

    }
  }

  Delete(Event,i){
    console.log(Event,i);
    let flag=true;
    flag=confirm(' Delete the event?');
   if(flag==true){
    if(this.UserEventList[i].name==Event.name){
      this.api.DeleteEvent(this.UserEventList[i].id);
  }}


    }

  }

