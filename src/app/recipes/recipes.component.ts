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
  searchParam: string;

  ngOnInit() {

    this.searchParam = this._route.snapshot.paramMap.get('search');

    this._recipe.getRecipes().subscribe((recipes)=>{            
      this.recipes = recipes;
      console.log(recipes)      
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
      this.recipes.push(recipes[0])
    })
  } 
}
