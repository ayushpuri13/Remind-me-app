export class User{
    Email:String;
    Password:string;
    FirstName:string;
    LastName:string;
    Contact:Number;
    id:string;
    tokens:{
        refresh:string;
        access:string;
    }
}