import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private _recipe: RecipeService,
              private _route: ActivatedRoute) { }

  recipes: any;
  searchParam: string; //from url
  searchResult: string; //from searchbox

  ngOnInit() {

    this.searchParam = this._route.snapshot.paramMap.get('search');
    this.searchResult = this.searchParam;

    if(!this.searchParam){
      this._recipe.getRecipes().subscribe((recipes)=>{            
        this.recipes = recipes;
        this.recipes.map((res)=>{
          console.log(res.meal_type)
          if(res.meal_type == 1) res.meal_type_info = "vlees";
          if(res.meal_type == 2) res.meal_type_info = "vis"; 
          if(res.meal_type == 3) res.meal_type_info = "vegetarisch"; 
          if(res.meal_type == 4) res.meal_type_info = "veganistisch"; 
        })
        console.log(recipes)      
      })
    } else {
      this._recipe.getRecipesFor(this.searchResult).subscribe((recipes)=>{
        this.recipes = recipes;
      })
    }
  } 

  SearchRecipes(event){
    if(!this.searchResult){
      this._recipe.getRecipes().subscribe((recipes)=>{            
        this.recipes = recipes;
        console.log(recipes)      
      })
    } else {
      this._recipe.getRecipesFor(this.searchResult).subscribe((recipes)=>{
        this.recipes = recipes;
      })
    }
  }

  clearSearch(){
    this.searchResult = "";
    this.SearchRecipes('');
  }

  getMealType(type){
    switch(type) { 
      case 1: { 
        return "recipe_mealtype__meat";
      } 
      case 2: { 
        return "recipe_mealtype__fish";
      } 
      case 3: { 
        return "recipe_mealtype__vegetarian";
      } 
      case 4: { 
        return "recipe_mealtype__vegan";
      } 
   } 
    
  }

}
