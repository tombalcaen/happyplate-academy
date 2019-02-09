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
  images : Array<any> = []

  ngOnInit() {
    this.createRecipeForm();
  }

  createRecipeForm(){
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      meal_type: [1, Validators.required],
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
      cholesterol: '',
      imgSource: ''      
    })
  }

  createRecipe(recipe){
    //split on enter, remove empty array elements
    let ingr = recipe.ingredients.split(/\r?\n/).filter(v=>v?v:null);
    let instr = recipe.recipeInstructions.split(/\r?\n/).filter(v=>v?v:null);

    //add image inspiration source to object
    if(recipe.imgSource){
      this.images[0].insp = recipe.imgSource;
    }

    this.recipeObj = {
      name: recipe.name,
      description: recipe.description,
      meal_type: recipe.meal_type,
      tags: recipe.tags.split(',').filter(v=>v?v:null), //['vegetarisch','vegan','lunch'],    
      ingredients: ingr,//[{amount: 10, unit: 'gram', descr: 'boter'},{amount: 2, unit: 'stukken', descr: 'avocado'}],
      recipeInstructions: instr,//['eerste stap','tweede stap','derde stap','vierde stap','vijfde stap'],
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
    this.addTag(+recipe.meal_type);
    console.log(this.recipeObj)

    this._recipe.createRecipe(this.recipeObj).subscribe((res)=>{
      alert(res.message)
    })
  }

  addTag(meal_type){

    if(meal_type == 1) this.recipeObj.tags.unshift('vlees');
    else if(meal_type == 2) this.recipeObj.tags.unshift('vis');
    else if(meal_type == 3) this.recipeObj.tags.unshift('vegetarisch');
    else if(meal_type == 4) this.recipeObj.tags.unshift('vegan');
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

  addRemoveTag(tag){

    this.recipeForm.controls["tags"].patchValue(this.recipeForm.controls["tags"].value + tag + ',');
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
