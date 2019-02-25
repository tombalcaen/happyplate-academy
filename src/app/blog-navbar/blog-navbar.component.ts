import { Component, OnInit, ElementRef } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'blog-navbar',
  templateUrl: './blog-navbar.component.html',
  styleUrls: ['./blog-navbar.component.css'],
})
export class BlogNavbarComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _eref: ElementRef) { }
  
  blnNarrow = false;
  blnMobile = false;
  blnLoggedIn : boolean = false;
  blnPopoverActive: boolean = false;

  ngOnInit() {
    this.blnLoggedIn = !this._auth.loggedIn();

    console.log("logged in: " + this.blnLoggedIn)
    // this._auth.getProfile().subscribe((user)=>{
    //   console.log(user)
    // })
  }

  onActivate(event) {
    if(this.isMobileDevice()) this.blnNarrow = true;
  }

  onLogout(){
    this._auth.logout().then((res)=>{
      this.blnLoggedIn = false;
    });
  }

  // onScroll($event){    
  //   document.scrollingElement.scrollTop >= 100 || this.isMobileDevice()? this.blnNarrow = true : this.blnNarrow = false;
  // }
  
  // onMobileNav(){    
  //   this.blnMobile = !this.blnMobile;    
  // }
  
  isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };

  togglePopover(){
    console.log(this.blnPopoverActive)
    this.blnPopoverActive?this.blnPopoverActive = false:this.blnPopoverActive = true;
  }
}



