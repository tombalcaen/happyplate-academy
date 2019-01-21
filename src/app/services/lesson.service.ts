import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

interface Lesson {
  _id?: string;
  name: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private _http: HttpClient) { }

  createLesson(lesson): Promise<void | Lesson>{
    return this._http.post(environment.connection_uri + 'lesson/create/', lesson)
    .toPromise()
    .then(response => response as Lesson)
    .catch(this.handleError);  
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
