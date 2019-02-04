import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private _recipe: RecipeService) { }

  recipeObj : {};
  images : Array<Object> = []

  ngOnInit() {
    this.createRecipeForm();
  }

  createRecipeForm(){
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      tags: '',      
      ingredients: '',
      recipeInstructions: '',
      servings:  '',
      prepTime:  '',
      cookTime:  '',
      difficulty_index:  '',
      health_index:  '',
      nutrition: '',  
      sourceName: '',
      sourceLink: '',
      calories: '',
      carbs: '',
      starch: '',
      sugar: '',
      fiber: '',
      fat: '',
      sat_fat: '',
      mono_fat: '',
      poly_fat: '',
      protein: '',
      transfat: '',
      cholesterol: ''      
    })
  }

  createRecipe(recipe){
    this.recipeObj = {
    name: recipe.name,
    description: recipe.description,
    tags: recipe.tags.split(','), //['vegetarisch','vegan','lunch'],    
    ingredients: recipe.ingredients.split(','),//[{amount: 10, unit: 'gram', descr: 'boter'},{amount: 2, unit: 'stukken', descr: 'avocado'}],
    recipeInstructions: recipe.recipeInstructions.split(','),//['eerste stap','tweede stap','derde stap','vierde stap','vijfde stap'],
    servings:  3,
    time_spend:  {prepTime: +recipe.prepTime, cookTime: +recipe.cookTime, totalTime: +recipe.prepTime + +recipe.cookTime},
    difficulty_index:  recipe.difficulty_index,
    health_index:  recipe.health_index,
    nutrition: [
      {descr: "calories", a: recipe.calories, u: "kcal"},
      {descr: "carbs", a: recipe.carbs, u: "gram"},
      {descr: "starch", a: recipe.starch, u: "gram"},
      {descr: "sugar", a: recipe.sugar, u: "gram"},
      {descr: "fiber", a: recipe.fiber, u: "gram"},
      {descr: "fat", a: recipe.fat, u: "gram"},
      {descr: "sat_fat", a: recipe.sat_fat, u: "gram"},
      {descr: "mono_fat", a: recipe.mono_fat, u: "gram"},
      {descr: "poly_fat", a: recipe.poly_fat, u: "gram"},
      {descr: "protein", a: recipe.protein, u: "gram"},
      {descr: "transfat", a: recipe.transfat, u: "gram"},
      {descr: "cholesterol", a: recipe.cholesterol, u: "mg"},
    ], 
    source: {name: recipe.sourceName, link: recipe.sourceLink},
    images: this.images, //[{source: "bla bla bla", height: '200px', width: '200px', title: "image title"}]
  }

  console.log(this.recipeObj)

    this._recipe.createRecipe(this.recipeObj).subscribe((res)=>{
      console.log(res)
    })

  }

  addNewTag(){
    let control = <FormArray>this.recipeForm.controls.tags;
    control.push(
      this.fb.group({
        tag: [''],
        // nested form array, you could also add a form group initially
        projects: this.fb.array([])
      })
    )
  }

  deleteTag(index) {
    let control = <FormArray>this.recipeForm.controls.tags;
    control.removeAt(index)
  }

  onFileChanged(event) {
    console.log(event.target.files[0])
    const file = event.target.files[0]
    let reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = (_event) => { 
      this.images.push({source: reader.result.toString(), height: '200px', width: '200px', title: "image title"}) ; 
    }
  }

  resetForm(){
    this.recipeForm.reset();
  }

}
