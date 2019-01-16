import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http: HttpClient) { }

  getLessons(chId): Observable<any>{      
    console.log("services getlessons") 
    return this._http.get(environment.connection_uri + "lesson",{params:{chId: chId}});
  }

  getChaptersForCourse(): Observable<any>{
    console.log("get chaptersfor course")
    return this._http.get(environment.connection_uri + "chapter")
  }

}
