import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

interface Course{
  _id?: String,
  name: String,
  descr: String,
  price: Number,
  status: String
}

interface Chapter{
  _id?: String,
  name: String,
  cId: String,
  n: Number,
  created?: Number,
  last_edit?: Number,
  lessons: Array<any>
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http: HttpClient) { }

  getLessons(chId): Observable<any>{    
    return this._http.get(environment.connection_uri + "lesson",{params:{chId: chId}});
  }

  getCourses(): Observable<any>{
    return this._http.get(environment.connection_uri + "course");
  }

  createCourse(course : Course): Observable<any>{    
    return this._http.post(environment.connection_uri + "course/create", course);
  }

  updateCourse(course : Course): Observable<any>{
    console.log(course)
    return this._http.post(environment.connection_uri + "course/update", course);
  }

  deleteCourse(course_id): Observable<any>{
    return this._http.delete(environment.connection_uri + "course/delete?_id=" + course_id)
  }

  getChaptersForCourse(cId): Observable<any>{
    return this._http.get(environment.connection_uri + "chapter",{params:{cId: cId}})
  }

  createChapter(chapter: Chapter): Observable<any>{ 
    return this._http.post(environment.connection_uri + "chapter/create", chapter)
  }

  // createInventory(newItem): Promise<void | Item>{    
  //   return this._http.post(environment.connection_uri + 'inventory/', newItem)
                // .toPromise()
                // .then(response => response as Item)
                // .catch(this.handleError);    
  // }

}
