import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'blog-footer',
  templateUrl: './blog-footer.component.html',
  styleUrls: ['./blog-footer.component.css']
})
export class BlogFooterComponent implements OnInit {

  constructor(private _auth : AuthService) { }
  admin: Boolean;
  ngOnInit() {
    this.admin = this._auth.isAdmin();
  }

}
