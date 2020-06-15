import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyScreenComponent } from './verify-screen/verify-screen.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/Auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ToDoComponent } from './to-do/to-do.component';
import { AddEventComponent } from './dashboard/add-event/add-event.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Resolver} from "./shared/resolver";
import {CardModule} from 'primeng/card';

import {ButtonModule} from 'primeng/button';

import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {CalendarModule} from 'primeng/calendar';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    DashboardComponent,
    VerifyScreenComponent,
    ResetPasswordComponent,
    ToDoComponent,
    AddEventComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    CalendarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
  Resolver,

    {
      provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
