const mongoose = require('mongoose');
const config = require('../config/database');

const user_recipesSchema = mongoose.Schema({
    // _id: {type: mongoose.Types.ObjectId},
    userId: {type: mongoose.Types.ObjectId, required: true},    
    recipeId: [{ type: mongoose.Schema.Types.ObjectId, ref:'recipes' }],
    
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const userRecipes = module.exports = mongoose.model('user_recipes', user_recipesSchema);

//GET
module.exports.getUserRecipes = function(user_id,callback){
    console.log("in model ")
    userRecipes.find({"userId": mongoose.Types.ObjectId(user_id)},callback).populate('recipeId','name images')
}

module.exports.checkSaved = function(user_id, recipe_id, callback){
    userRecipes.find({"userId": mongoose.Types.ObjectId(user_id), recipeId: mongoose.Types.ObjectId(recipe_id)},callback);
}

// module.exports.getRecipesFor = function(tag,callback){    
//     recipes.find({tags: tag},{name: 1, time_spend: 1, difficulty_index: 1, health_index: 1, images: 1, dateCreated: 1, meal_type: 1, tags: 1, rateValue: 1, rateCount: 1},callback)
// }

// module.exports.getRecipesById = function(_id,callback){    
//     recipes.find({_id: mongoose.Types.ObjectId(_id)},callback)
// }

//CREATE
module.exports.createUserRecipe = function(user_id, recipe_id,callback){
    userRecipes.find({userId: mongoose.Types.ObjectId(user_id)},(error,result)=>{
        if(error) {throw error;}
        if(!result.length){
            console.log("we hebben nog geen")
            const userRecipe = new userRecipes(
                {userId: mongoose.Types.ObjectId(user_id),
                 recipeId: [mongoose.Types.ObjectId(recipe_id)]
                })
            userRecipe.save(callback)
        } else {
            console.log("we hebben al eentje")
            userRecipes.findOneAndUpdate({"userId": mongoose.Types.ObjectId(user_id), "recipeId": { $ne: mongoose.Types.ObjectId(recipe_id)}},{ $push: {recipeId: mongoose.Types.ObjectId(recipe_id)}},callback)
        }
    })
}
