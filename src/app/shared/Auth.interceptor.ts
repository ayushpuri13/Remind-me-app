import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpRequest, HttpClient, HttpResponse} from "@angular/common/http";
import {HttpInterceptor} from "@angular/common/http";
import { Observable,throwError,of } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import 'rxjs/add/operator/catch';
import { catchError,mergeMap,flatMap } from 'rxjs/operators';
import 'rxjs/add/operator/mergeMap';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor
{

token:string='';
apiUrl:any='https://remind-me-backend.herokuapp.com';

    constructor(public http: HttpClient,private authService : AuthService,private router :Router) { }


    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>
    {
        this.token=this.authService.getToken();


       if(this.token!==null){
       req= this.addToken(req,this.token);   
       }

       return  next.handle(req).pipe(catchError(err=>{
         
           console.log(err);
           if(err.status==401){
              console.log('i m in err')
            let params={
                access:localStorage.getItem('access_token'),
                refresh:localStorage.getItem('refresh_token')
            }
           if(params.refresh){

             this.authService.refreshToken(params).toPromise().then((data:any)=>{
                if(!data) return; 
                console.log('i m in ref int')
                console.log(data);        
                localStorage.setItem('access_token',data.access);
                localStorage.setItem('refresh_token',data.refresh);
                return next.handle(this.addToken(req,data.access));
                
    
        });}
            }

                            

 return throwError(err);
        }));
    }

 addToken(req:HttpRequest<any>,token:string){
   return req=req.clone({
        setHeaders:{
            'Authorization':'Bearer ' + token
        }
    });
}

}

