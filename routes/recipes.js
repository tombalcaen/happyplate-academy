const express = require('express');
const router = express.Router();
const moment = require("moment/moment");

const RecipesList = require("../models/recipes");
const Recipe_ratesList = require("../models/recipe_rates");
const user_recipes = require("../models/user_recipes");

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
    RecipesList.getRecipesById(req.query._id,(err, recipe)=>{        
    if(err){        
        res.json({success: false, message: "failed to get recipe."})
      } else {
          res.json(recipe);
      }
    })
})

router.get('/rate',(req,res,next)=>{
    Recipe_ratesList.getRatesForUser(req.query.Uid,req.query.Rid,(err, rates)=>{
        if(err){            
            res.json({success: false, message: "failed to get rates for user"});
        } else {            
            res.json(rates)
        }
    })
    // RecipesList.getRecipesById(req.query._id,(err, recipe)=>{        
    // if(err){
    //     console.log(err.message)
    //     res.json({success: false, message: "failed to get recipe."})
    //   } else {
    //       res.json(recipe);
    //   }
    // })
    // res.json({message: "back"})
})

router.get('/rate/all',(req,res,next)=>{
    Recipe_ratesList.getAllRatesForUser(req.query.Uid,(err, rates)=>{
        if(err){
            console.log(err.message)
            res.json()
        } else {
            res.json(rates)
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
    let newRecipe_rates = new Recipe_ratesList({
        userId: req.body.userId,
        recipeId: req.body.recipe_id,
        value: req.body.rate_value,
        date: +moment()
    })

    Recipe_ratesList.createRecipeRates(newRecipe_rates,(err, Recipe_rate)=>{
        if(err){            
            res.json({success: false, message: "Failed to create new recipe_rate!"})
        } else {
            RecipesList.addRating(newRecipe_rates,(err, recipe)=>{                
                if(err) console.log(err.messsage)
                else {
                    res.json({success: true, message: "Recipe_rate created!", recipe: recipe})
                }
                
            })            
        }
    })
})


// MYRECIPES

router.get('/myrecipes',(req,res,next)=>{
    console.log("in router " + req.query.user_id)
    const user_id = req.query.user_id;
    user_recipes.getUserRecipes(user_id,(err,userRecipes)=>{
        if(err) console.log(err.message);
        else {
            res.json({success: true, myrecipes: userRecipes})
        }
    })
})

router.get('/myrecipes/saved',(req,res,next)=>{
    const user_id = req.query.user_id;
    const recipe_id = req.query.recipe_id;
    user_recipes.checkSaved(user_id,recipe_id,(err,userRecipes)=>{
        if(err) {
            console.log(err.message);
            res.json({success: false, message: err.message})
        }
        else {            
            res.json({success: true, myrecipes: userRecipes})
        }
    })
})


router.post('/myrecipes/create',(req,res,next)=>{
    const user_id = req.body.user_id;
    const recipe_id = req.body.recipe_id;
    user_recipes.createUserRecipe(user_id, recipe_id,(err, userRecipe)=>{
        if(err) {            
            console.log(err.message);
            res.json({success: false, message: "unable to store in my recipe book"})
        }
        else {
            res.json({success: true, message: "succesfully saved recipe to recipebook."});
        }
    })
})

module.exports = router;