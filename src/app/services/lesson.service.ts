import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

import { CourseService } from "../services/course.service"
import { ChapterService } from './chapter.service';
import { Observable } from 'rxjs';

interface Lesson {
  _id?: string;
  chId: String;
  name: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private _http: HttpClient,
              private _course: CourseService,
              private _chapter: ChapterService) { }

  getLessons(lId): Observable<any>{    
    return this._http.get(environment.connection_uri + "lesson",{params:{_id: lId}});
  }

  createLesson(lesson): Promise<any>{
    return this._http.post(environment.connection_uri + 'lesson/create/', lesson)
    .toPromise()    
    // .then(response => response as Lesson)
    .then((res)=>{  
      console.log("lesson created and now the push!")    
      this._chapter.pushLessonInChapter(res).subscribe((r)=>{
        console.log(r);
      });
      return res;
    })
    .catch(this.handleError);  
  }

  deleteLesson(id): Observable<any>{
    console.log("deletelesson")
    return this._http.delete(environment.connection_uri + 'lesson/delete?_id=' + id);            
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
