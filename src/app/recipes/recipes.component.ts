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

}
