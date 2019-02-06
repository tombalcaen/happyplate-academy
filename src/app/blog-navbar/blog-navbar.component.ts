import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-navbar',
  templateUrl: './blog-navbar.component.html',
  styleUrls: ['./blog-navbar.component.css'],
  // host: {
  //   '(window:scroll)':'onScroll($event)'
  // }
})
export class BlogNavbarComponent implements OnInit {

  constructor() { }
  
  blnNarrow = false;
  blnMobile = false;

  ngOnInit() {
  }

  onActivate(event) {
    if(this.isMobileDevice()) this.blnNarrow = true;
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

}



