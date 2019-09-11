import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import {environment} from "../../environments/environment";

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _http: HttpClient,
              private _auth: AuthService) { }


  // GET

  getRecipes(): Observable<any> {
    return this._http.get(environment.connection_uri + 'recipe');
  }

  getRecipesFor(recipe_tag): Observable<any>{
    console.log(recipe_tag)
    return this._http.get(environment.connection_uri + "recipe/for?tag=" + recipe_tag);
  }

  getRecipeById(_id): Observable<any> {
    return this._http.get(environment.connection_uri + 'recipe/id?_id=' + _id);
  }

  // CREATE

  createRecipe(recipe): Observable<any>{
    return this._http.post(environment.connection_uri + "recipe/create", recipe)
  }

  incrementView(recipe_id): Observable<any>{
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
    return this._http.get(environment.connection_uri + 'recipe/rate',{params: {'Uid': user_id, 'Rid': recipe_id}});    
  }

  getAllRatesForId(): Observable<any>{
    let user_id = this._auth.loadLocalUser();
    return this._http.get(environment.connection_uri + 'recipe/rate/all', {params: {'Uid': user_id}})
  }

  createRecipe_rate(rate_value,recipe_id): Observable<any>{
    const user = this._auth.loadLocalUser();
    
    let recipe_rates = {
      userId: user,
      recipe_id: recipe_id,
      rate_value: rate_value
    }

    return this._http.post(environment.connection_uri + "recipe/rate/create", recipe_rates);
  }

  // MYRECIPES

  getMyRecipes(): Observable<any>{    
    return this._http.get(environment.connection_uri + "recipe/myrecipes?user_id=" + this._auth.loadLocalUser());
  }

  recipeSaved(recipe_id): Observable<any>{
    return this._http.get(environment.connection_uri + "recipe/myrecipes/saved",{params: {'user_id': this._auth.loadLocalUser(), 'recipe_id': recipe_id}})
  }

  saveToMyRecipes(recipe_id): Observable<any>{
    const a = {
      user_id: this._auth.loadLocalUser(),
      recipe_id: recipe_id
    }

    return this._http.post(environment.connection_uri + "recipe/myrecipes/create", a);
  }

  

}
