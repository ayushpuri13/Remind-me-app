import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyScreenComponent } from './verify-screen/verify-screen.component';

const routes: Routes = [{path:'register',component:SignupComponent},
                        {path:'verify-email',component:VerifyScreenComponent},
                        {path:'dashboard',component:DashboardComponent},
                        {path:'forget-password',component:ForgetPasswordComponent},
                        {path:'change-password',component:ChangePasswordComponent},
                        {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
