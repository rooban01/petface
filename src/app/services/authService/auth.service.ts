import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../../models/register.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from "../../../environments/environment";
import { LoginModel } from 'src/app/models/login.model';


const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusListener =new Subject<boolean>();
  private userId : string;
  private isAuthenticated = false;
  private tokenTimer : any;
  private token: string;
  private userData: any;

  constructor(private httpClient: HttpClient, private router: Router){}

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }



  registerUser (username: string, email: string, password: string,is_vet:string,  address: string,  code_postal: string, ville:string, longitude: string, latitude: string){
    const authData : RegisterModel = {username:"Jega", email: email, password: password, is_veterinary:"1",telephone:"55555", address:"ee",code_postal:"55", ville:"paris", longitude:"555", latitude:"888"}
    this.httpClient.post<{payload:any}>(BACKEND_URL+"/register", authData)
       .subscribe( response => {

        this.authStatusListener.next(false);
        this.router.navigate(["/login"]);
       }, error => {

           this.authStatusListener.next(false);
       });

  }


  loginUser(email: string, password: string) {
    const loginData: LoginModel = {email: email, password:password};

    this.httpClient.post<{token: string, success: any, data:any,user: any, expiresIn: number, userId: string}>(BACKEND_URL+"/authenticate", loginData)
    .pipe(map((responseData) => {
      console.log(responseData.data.user[0].id_user)
        return   this.userData = responseData.data

    }))

    .subscribe(user => {
      const token = user.token;
      this.token = user.token;
      if(token){
       const expiresInDuration = user.expiresIn;
       console.log(expiresInDuration)
       this.setAuthTimer(expiresInDuration);
       this.isAuthenticated = true;
      this.userId = user.user[0].id_user;
      this.authStatusListener.next(true);

      const now = new Date();

      const expirationDate = new Date ( now.getTime() + expiresInDuration * 1000);

      this.saveAuthData(token,expirationDate, this.userId);
      this.router.navigate(['/home']);
      }
   }, error => {
      this.authStatusListener.next(false);
   });
  }

  private saveAuthData(token:string, expirationDate: Date,userId: string){

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
     localStorage.setItem('expiration', expirationDate.toISOString());


  }

  private setAuthTimer (duration: number){
    this.tokenTimer =  setTimeout(() => {
      this.logout();
    } , duration *1000);
  }


  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }


  autoAuthUser(){
    const authInformation =  this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date ();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log("service"+expiresIn)
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
 }

 private getAuthData(){
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  const userId = localStorage.getItem('userId');
  if(!token || !expirationDate){
     return;
  }
  return{
    token: token,
     expirationDate: new Date(expirationDate),
     userId : userId
  }
}
}
