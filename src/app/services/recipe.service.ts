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
    return this._http.post(environment.connection_uri + "recipe/increment", {_id: recipe_id});
  }

  incrementLike(recipe_id): Observable<any>{    
    return this._http.post(environment.connection_uri + "recipe/increment_like", {_id: recipe_id});
  }

  decrementLike(recipe_id): Observable<any>{    
    return this._http.post(environment.connection_uri + "recipe/decrement_like", {_id: recipe_id});
  }

  // RATES

  getRatesForId(user_id,recipe_id): Observable<any>{
    console.log("go")
    return this._http.get(environment.connection_uri + "recipe/rate?Uid=" + "5c27831efe40725124bc3744") // + "?Rid=" + "5c62d2de7691feb396f01ae9"
  }

  createRecipe_rate(rate_value,recipe_id): Observable<any>{
    console.log(rate_value);

    let recipe_rates = {
      userId: "5c27831efe40725124bc3744",
      recipe_id: recipe_id,
      rate_value: rate_value
    }

    return this._http.post(environment.connection_uri + "recipe/rate/create", recipe_rates);
  }

}
