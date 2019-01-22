import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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
export class ChapterService {

  constructor(private _http: HttpClient) { }

  createChapter(chapter: Chapter): Observable<any>{ 
    console.log(chapter)
    return this._http.post(environment.connection_uri + "chapter/create", chapter)
  }

  updateChapter(chapter): Observable<any>{
    console.log("service: update chapter");
    console.log(chapter);
    return this._http.post(environment.connection_uri + "chapter/update", chapter);
  }

  deleteChapter(id): Observable<any>{
    
    return this._http.delete(environment.connection_uri + 'chapter/delete?_id=' + id);
  }
}
