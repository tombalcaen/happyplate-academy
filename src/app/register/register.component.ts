import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder,
              private _auth: AuthService) {
    this.createRegisterForm();
   }

  ngOnInit() {
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onRegister(registerData){
    const user = {
      fullName: registerData.fullName,
      email: registerData.email,
      password: registerData.password
    }

    this._auth.registerUser(user).subscribe((data)=>{
      console.log(data)
      if(data.success){
        // this._router.navigate(['/login'])
        // //console.log("You are successfully registered.");
      } else {
        // this.blnError = true;
        // this.errorMsg = "Couldn't create user."
        // //this._router.navigate(['/register']) 
      }
    });
  }


  resetRegisterForm(){
    this.registerForm.reset();
  }
}
