import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _http: HttpClient) { }

  getRecipes(): Observable<any>{    
    return this._http.get(environment.connection_uri + "recipe");
  }

  getRecipesFor(recipe_tag): Observable<any>{
    console.log(recipe_tag)
    return this._http.get(environment.connection_uri + "recipe/for?tag=" + recipe_tag);
  }

  getRecipeById(_id): Observable<any>{
    return this._http.get(environment.connection_uri + 'recipe/id?_id=' + _id);
  }

  createRecipe(recipe): Observable<any>{
    return this._http.post(environment.connection_uri + "recipe/create", recipe)
  }

  incrementView(recipe_id): Observable<any>{
    console.log("rec " + recipe_id)
    return this._http.post(environment.connection_uri + "recipe/increment", recipe_id);
  }

}
