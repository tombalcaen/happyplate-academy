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

router.get('/id',(req,res,next)=>{
    console.log('router id: ' + req.query._id)
    RecipesList.getRecipesById(req.query._id,(err, recipe)=>{        
    if(err){
        console.log(err.message)
        res.json({success: false, message: "failed to get chapter."})
      } else {
          res.json(recipe);
      }
    })
})

router.post('/create',(req,res,next)=>{
    let newRecipe = new RecipesList({
        name: req.body.name,
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
        source: req.body.source
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
    console.log("router increment")
    RecipesList.incrementView(_id,(err,Recipe)=>{
        if(err){
            console.log(err.message);
            res.json({success: false, message: "Failed to increment view!"})
        } else {
            res.json({success: true, message: "incremented!"})
        }
    })
})


module.exports = router;