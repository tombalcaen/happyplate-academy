const express = require('express');
const router = express.Router();
const moment = require("moment/moment");

const RecipesList = require("../models/recipes");

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
        like_score: 0,
        like_n: 0
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


module.exports = router;