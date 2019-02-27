import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _http: HttpClient,
              private _auth: AuthService) { }

  // GET
  getArticles(): Observable<any>{    
    return this._http.get(environment.connection_uri + "article");
  }

  getArticleById(_id): Observable<any>{
    return this._http.get(environment.connection_uri + 'article/id?_id=' + _id);
  }

  getAllLikesForId(): Observable<any>{
    let user_id = this._auth.loadLocalUser();
    return this._http.get(environment.connection_uri + 'article/like/all', {params: {'Uid': user_id}})
  }

  // CREATE
  createArticle(article,title,description,contributor,images): Observable<any>{

    let newArticle = {
      name: title,
      description: description,
      body: article,
      files: images,
      tags: [],
      contributor: {name: contributor.name, title: contributor.title},
      status: "published"
    }

    return this._http.post(environment.connection_uri + 'article/create/', newArticle);
  }

  incrementView(article_id): Observable<any>{
    console.log("rec " + article_id)
    return this._http.post(environment.connection_uri + "article/increment", {_id: article_id});
  }

  incrementLike(user_id,article_id): Observable<any>{    
    return this._http.post(environment.connection_uri + 'article/append_like',{'Uid': user_id, 'Aid': article_id})
  }

  decrementLike(article_id): Observable<any>{    
    return this._http.post(environment.connection_uri + "article/decrement_like", {_id: article_id});
  }

// RATES

}
