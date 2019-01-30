import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

import { CourseService } from "../services/course.service"
import { ChapterService } from './chapter.service';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

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
      this._chapter.pushLessonInChapter(res).subscribe((r)=>{
        console.log(r);
      });
      return res;
    })
    .catch(this.handleError);  
  }

  deleteLesson(lesson): Promise<any>{
    console.log("deletelesson: " + lesson)
    return this._http.delete(environment.connection_uri + 'lesson/delete?_id=' + lesson._id)
    .toPromise()
    .then((res)=>{
      console.log(lesson)
      this._chapter.deleteLessonInArray(lesson).subscribe((r)=>{
        console.log(r)
      })
    })
  }

  updateStatus(lesson): Observable<any>{        
    return this._http.post(environment.connection_uri + "lesson/update_status", lesson);
  }

  findFiles():Observable<any>{
    return this._http.get(environment.connection_uri + 'files');
  }

  findFile(filename):Observable<any>{
    return this._http.get(environment.connection_uri + 'files/?filename=' + filename);
  }

  getImage(filename):Observable<any>{
    console.log(filename)
    // return this._http.get(environment.connection_uri + 'image',{responseType: 'blob', params:{filename: filename}});
    return this._http.get(environment.connection_uri + 'image',{responseType: 'blob',params:{filename}}); //filename //,{responseType: 'text',params:{filename}}
    // return this._http.get(environment.connection_uri + 'images');
    
  }

  uploadFile(payload): Promise<any>{     
    return this._http.post(environment.connection_uri + 'upload', payload)
                      .toPromise();
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
