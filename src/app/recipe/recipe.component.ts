import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private _recipe: RecipeService) {
                
               }

  recipe_id: string;
  recipe: any;
  blnShowSource: boolean = false;

  ngOnInit() {
    this.recipe_id = this._route.snapshot.paramMap.get('_id');
    this._recipe.incrementView(this.recipe_id);
    this._recipe.getRecipeById(this.recipe_id).subscribe((recipeObj)=>{      
      this.recipe = recipeObj[0];  
      console.log(recipeObj[0])      
      this.recipe.tags.push(recipeObj[0].tags[1])
      this.recipe.tags.push(recipeObj[0].tags[1])
      this.recipe.tags.push(recipeObj[0].tags[1])
      this.recipe.tags.push(recipeObj[0].tags[1])
      this.recipe.tags.push(recipeObj[0].tags[1])
      this.recipe.tags.push(recipeObj[0].tags[1])
      this.recipe.tags.push(recipeObj[0].tags[1])
      this.recipe.tags.push(recipeObj[0].tags[1])
      // this.recipe.images[0].source = this.domSanitizer.bypassSecurityTrustUrl(this.recipe.images[0].source);      
    })
  }

  showSource(){
    this.blnShowSource? this.blnShowSource = false:this.blnShowSource = true;
  }

}
