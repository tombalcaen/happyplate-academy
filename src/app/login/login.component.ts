import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private _auth: AuthService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.createLoginForm();
   }

   blnError: boolean = false;
   errorMsg: string = "";
   returnUrl: string;

  ngOnInit() {
    this._auth.getLogin();
    // get return url from route parameters or default to '/'
    console.log(this._route.snapshot.queryParams['returnUrl'])
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || ['/blog'];
    console.log(this.returnUrl)
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onLogin(loginData){    
    const user = {
      email: loginData.email,
      password: loginData.password
    }

    this._auth.authenticateUser(user).subscribe((data)=>{
      if(data.success){        
        console.log(data)
        this._auth.storeUserData(data.token,data.user);  
        // login successful so redirect to return url
        this._router.navigateByUrl(this.returnUrl);
        // this._router.navigate(['/blog']);
      } else {
        console.log(data)
        this.blnError = true;
        this.errorMsg = "login gegevens zijn incorrect";
        this.loginForm.reset();
        // this._router.navigate(['/login']);
      }
    })
  }

}
