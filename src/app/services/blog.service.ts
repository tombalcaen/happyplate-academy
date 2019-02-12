import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) { }

  //GET
  getHighlights(): Observable<any>{    
    console.log("heah")
    return this._http.get(environment.connection_uri + "highlight");
  }

}
