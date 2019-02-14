const express = require('express');
const router = express.Router();
const moment = require("moment/moment");

const RecipesList = require("../models/recipes");
const Recipe_ratesList = require("../models/recipe_rates");

router.get('/',(req,res,next)=>{
    RecipesList.getRecipes((err, items)=>{        
    if(err){
        console.log(err.message)
        res.json({success: false, message: "failed to get chapters."})
      } else {
          res.json(items);
      }
    })
})

router.get('/for',(req,res,next)=>{
    console.log("router getrecipefor: " + req.query.tag)
    RecipesList.getRecipesFor(req.query.tag,(err, items)=>{        
    if(err){
        console.log(err.message)
        res.json({success: false, message: "failed to get chapters."})
      } else {
          res.json(items);
      }
    })
})

router.get('/id',(req,res,next)=>{
    console.log('router id: ' + req.query._id)
    RecipesList.getRecipesById(req.query._id,(err, recipe)=>{        
    if(err){
        console.log(err.message)
        res.json({success: false, message: "failed to get recipe."})
      } else {
          res.json(recipe);
      }
    })
})

router.post('/create',(req,res,next)=>{
    let newRecipe = new RecipesList({
        name: req.body.name,
        meal_type: req.body.meal_type,
        description: req.body.description,
        tags: req.body.tags,
        dateCreated: +moment(),
        datePublished:  +moment(),
        dateModified: +moment(),
        ingredients: req.body.ingredients,
        recipeInstructions: req.body.recipeInstructions,
        servings:  req.body.servings,
        time_spend:  req.body.time_spend,
        difficulty_index:  req.body.difficulty_index,
        health_index:  req.body.health_index,
        nutrition: req.body.nutrition,        
        images: req.body.images,
        views: 0,
        source: req.body.source,        
        rateCount: 0,
        rateValue: 0,
        rateAverage: 0,
        // like_score: 0, //from older method
        // like_n: 0 //from older method
    })
    
    RecipesList.createRecipes(newRecipe,(err, Recipe)=>{
        if(err){
            console.log(err.message);
            res.json({success: false, message: "Failed to create new recipe!"})
        } else {
            res.json({success: true, message: "Recipe created!"})
        }
    })
})

router.post('/increment',(req,res,next)=>{    
    RecipesList.incrementView(req.body._id,(err,Recipe)=>{
        if(err){
            console.log(err.message);
            res.json({success: false, message: "Failed to increment view!"})
        } else {
            res.json({success: true, message: "incremented!"})
        }
    })
})

router.post('/increment_like',(req,res,next)=>{    
    RecipesList.incrementLike(req.body._id,(err,Recipe)=>{
        if(err){
            console.log(err.message);
            res.json({success: false, message: "Failed to increment like!"})
        } else {
            res.json({success: true, message: "incremented!",recipe: Recipe})
        }
    })
})

router.post('/decrement_like',(req,res,next)=>{    
    RecipesList.decrementLike(req.body._id,(err,Recipe)=>{
        if(err){
            console.log(err.message);
            res.json({success: false, message: "Failed to decrement like!"})
        } else {
            res.json({success: true, message: "decremented!",recipe: Recipe})
        }
    })
})

router.post('/rate/create',(req,res,next)=>{    
    console.log("router create recipe rate")
    let newRecipe_rates = new Recipe_ratesList({
        userId: req.body.userId,
        value: req.body.rate_value,
        date: +moment()
    })

    Recipe_ratesList.createRecipeRates(newRecipe_rates,(err, Recipe_rate)=>{
        if(err){
            console.log(err.message);
            res.json({success: false, message: "Failed to create new recipe_rate!"})
        } else {
            res.json({success: true, message: "Recipe_rate created!"})
        }
    })
})



module.exports = router;