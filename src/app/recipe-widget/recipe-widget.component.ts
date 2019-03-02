import { Component, OnInit, Input, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'recipe-widget',
  templateUrl: './recipe-widget.component.html',
  styleUrls: ['./recipe-widget.component.css']
})
export class RecipeWidgetComponent implements OnInit {
  @Input() recipe: any;
  // @ViewChildren('chefcount') chefCounts : QueryList<ElementRef>;
  @ViewChild('chefcount') el: ElementRef<any>;
  @ViewChild('chefdecr') chef_decr_el: ElementRef<any>;
  
  constructor(private _recipe: RecipeService) { }

  blnRecipeSave: boolean = false;

  ngOnInit() {
    this.recipe.rateAverage = this.recipe.rateValue / this.recipe.rateCount;    
  }

  loadRecipe(recipe){

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

  // toggleIcon(event,recipe){
  //   let el = this.el;
  //   let chef_decr_el = this.chef_decr_el;
    
  //   event.target.parentNode.parentNode.classList.remove("chef-button--default");
  //   event.target.parentNode.parentNode.classList.add("chef-button--active");
  //   setTimeout(function(){      
  //     event.target.parentNode.parentNode.classList.remove("chef-button--active");
  //     event.target.parentNode.parentNode.classList.add("chef-button--default");      
  //   },500);

    
  //   // +1 BULLET
  //   el.nativeElement.classList.add("active");
  //   setTimeout(function(){
  //     el.nativeElement.classList.remove("active");
  //   },1000);

  //   //DECREMENT ICON
  //   chef_decr_el.nativeElement.classList.add("active");
  //   setTimeout(function(){      
  //     chef_decr_el.nativeElement.classList.remove("active");
  //   },2000);

  //   //increment review_score
  //   this._recipe.incrementLike(recipe._id).subscribe((res)=>{      
  //     recipe.like_score++;
  //   })

  // }

  // revertLike(recipe){ 
  //   this.chef_decr_el.nativeElement.classList.remove("active");
  //   this._recipe.decrementLike(recipe._id).subscribe((res)=>{
  //     recipe.like_score--;
  //   })    
  // }

  // saveToMyRecipes(){
  //   this._recipe.saveToMyRecipes(this.recipe._id).subscribe(()=>{

  //   })
  // }

}
