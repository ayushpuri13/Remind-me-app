import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Add:boolean;
  currentUserName:string;

  constructor(private api : ApiService,private auth :AuthService) {

    this.currentUserName=this.auth.currentUserName;
   }

  ngOnInit() {

    this.Add=true;

  }

  ChangeTab(){
this.Add=!this.Add
  }

  Logout(){
    this.auth.logout();
  }


}
