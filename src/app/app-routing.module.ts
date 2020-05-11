import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyScreenComponent } from './verify-screen/verify-screen.component';
import { AuthGuard } from './shared/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [{path:'',component:LoginComponent,pathMatch:'full'},
                        {path:'register',component:SignupComponent},
                        {path:'verify-email',component:VerifyScreenComponent},
                        {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
                        {path:'forgot-password',component:ForgetPasswordComponent,canActivate:[AuthGuard]},
                        {path:'reset-password',component:ResetPasswordComponent,canActivate:[AuthGuard]},
                        {path:'change-password',component:ChangePasswordComponent,canActivate:[AuthGuard]},
                        {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
