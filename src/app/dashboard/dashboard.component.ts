import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import {ActivatedRoute, NavigationStart, Router,Event} from "@angular/router";





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Add:boolean;
  currentUserName:string;
  isLoading:boolean;
  searchword:string;



  constructor(private api : ApiService,private auth :AuthService,private route:ActivatedRoute,private router:Router) {

    this.currentUserName=this.auth.currentUserName;
   }

  ngOnInit() {
    this.Add=true;
    this.router.events.subscribe((event:Event) => {

this.ChangeTab(event['url']);
    })


  }

  ChangeTab(url){


 if(url=="/dashboard/add-event"){
   this.Add=false;
 }
 else{
   this.Add=true;
 }
  }

// searchInput(){
//   this.api.searchword(this.searchword);
// }


  Logout(){
    this.auth.logout();
  }


}
