import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient,
              private _router: Router,
              public jwtHelper: JwtHelperService) { }

  authToken: any;
  user: any;
  user_id: string;

  canActivate(){
    if(!this.loggedIn()) return true;
    else this._router.navigate(['/login']);
  }

  loggedIn(){    
    return this.jwtHelper.isTokenExpired();
  }

  getLogin(): Observable<any>{    
    return this._http.get(environment.connection_uri + "auth");
  }

  registerUser(user): Observable<any>{    
    let header = new HttpHeaders();
    header.append('Content-type','application/json');
    return this._http.post(environment.connection_uri + 'auth/register',user,{headers: header});
  }

  authenticateUser(user): Observable<any>{  
    let header = new HttpHeaders();
    header.append('Content-type','application/json');
    return this._http.post(environment.connection_uri + 'auth',user,{headers: header}); //https://ripe-avocado.herokuapp.com/
  }

  storeUserData(token,user){    
    localStorage.setItem("id_token",token);
    localStorage.setItem("user",user.id); //JSON.stringify(
    localStorage.setItem("fullName", user.fullName);
    localStorage.setItem("email", user.email);
    this.authToken = token;
    this.user = user;
  }

  getProfile(): Observable<any>{
    this.loadToken();
    this.loadLocalUser();
    let header = new  HttpHeaders({
      'Authorization':this.authToken,
      'Content-Type':'application/json'
    });
    return this._http.get(environment.connection_uri + 'auth?id='+ this.loadLocalUser(),{headers: header});
  }

  //CONTROL

  logout(): Promise<any>{
    return new Promise((resolve,reject)=>{
      this.authToken = null;
      this.user = null;
      localStorage.clear();
      resolve({success: true, message: "succesfully logged out"})
    })
    
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadLocalUser(){
    return localStorage.getItem('user');
  }

  loadFullName(){
    return localStorage.getItem("fullName");
  }

  loadEmail(){
    return localStorage.getItem('email')
  }

}
