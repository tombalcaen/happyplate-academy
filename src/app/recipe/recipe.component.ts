import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @ViewChild('rateRecipeModal') private rateRecipeModal : ElementRef;
  @ViewChild('openRateRecipeModal') private btnOpenRateRecipeModal : ElementRef;

  constructor(private _route: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private _recipe: RecipeService) {
                
               }

  recipe_id: string;
  recipe: any;
  blnShowSource: boolean = false;
  dummyRating: number = 0;

  ngOnInit() {
    this.recipe_id = this._route.snapshot.paramMap.get('_id');
    this._recipe.incrementView(this.recipe_id);
    this._recipe.getRatesForId("1","2");
    this._recipe.getRecipeById(this.recipe_id).subscribe((recipeObj)=>{      
      this.recipe = recipeObj[0];
      this.recipe.rateAverage = this.recipe.rateValue / this.recipe.rateCount;
      console.log(recipeObj[0])
      // this.recipe.images[0].source = this.domSanitizer.bypassSecurityTrustUrl(this.recipe.images[0].source);      
    })
  }

  showSource(){
    this.blnShowSource? this.blnShowSource = false:this.blnShowSource = true;
  }

  reviewRecipe(){
    //check if logged on
    //promt login
    //open popup to submit score
    this.btnOpenRateRecipeModal.nativeElement.click();
  }

  setRate(rate){
    this._recipe.createRecipe_rate(rate,this.recipe_id).subscribe((res)=>{
      console.log(res)
    })
    this.rateRecipeModal.nativeElement.click();
    //bedankt om dit recept te beoordelen
  }

}
