import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @ViewChild('rateRecipeModal') private rateRecipeModal : ElementRef;
  @ViewChild('openRateRecipeModal') private btnOpenRateRecipeModal : ElementRef;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              // private _routeState: RouterStateSnapshot,
              private domSanitizer: DomSanitizer,
              private _recipe: RecipeService,
              private _auth: AuthService) {
                this.routeState = _router.routerState.snapshot;                
               }

  recipe_id: string;
  recipe: any;
  blnShowSource: boolean = false;
  dummyRating: number = 0;
  blnLoggedIn : boolean = false;
  routeState: RouterStateSnapshot;
  user_recipe_rate: any;
  blnRecipeSaved: boolean = false;

  ngOnInit() {
    this.blnLoggedIn = !this._auth.loggedIn();
    
    this.recipe_id = this._route.snapshot.paramMap.get('_id');

    //increment visits
    this._recipe.incrementView(this.recipe_id);

    //get recipe data
    this._recipe.getRecipeById(this.recipe_id).subscribe((recipeObj)=>{      
      this.recipe = recipeObj[0];
      this.recipe.rateAverage = this.recipe.rateValue / this.recipe.rateCount;          
    })

    //check if saved
    this._recipe.recipeSaved(this.recipe_id).subscribe((res)=>{      
      if(res.myrecipes.length == 0) this.blnRecipeSaved = false;
      else this.blnRecipeSaved = true;
    })
  }

  showSource(){
    this.blnShowSource? this.blnShowSource = false:this.blnShowSource = true;
  }

  reviewRecipe(){
    //check if user already logged in.
    this.blnLoggedIn = !this._auth.loggedIn();

    if(this.blnLoggedIn){
      //check if recipe already reviewed for user
      this._recipe.getRatesForId(this._auth.loadLocalUser(),this.recipe_id).subscribe((rate)=>{        
        this.user_recipe_rate = rate[0];
      });
    }

    this.btnOpenRateRecipeModal.nativeElement.click();
  }

  setRate(rate){
    this._recipe.createRecipe_rate(rate,this.recipe_id).subscribe((res)=>{
      //hier refresh van de punten      
      this.recipe.ratevalue = +res.recipe.rateValue;
      this.recipe.rateCount = +res.recipe.rateCount;
      this.recipe.rateAverage = +res.recipe.rateValue / +res.recipe.rateCount;
    })
    this.rateRecipeModal.nativeElement.click();
    //bedankt om dit recept te beoordelen
  }

  onCallToAction(option){
    this.rateRecipeModal.nativeElement.click();
    if(option === "register"){
      this._router.navigateByUrl('/create-account');
    } else if (option === "login"){
      // this._router.navigateByUrl('/login')
      
      this._router.navigate(['login'], { queryParams: { returnUrl: this.routeState.url }});
    }
  }

  saveToMyRecipes(){        
    this._recipe.saveToMyRecipes(this.recipe._id).subscribe((res)=>{
      if(res.success) this.blnRecipeSaved = true;      
    })
  }

}
