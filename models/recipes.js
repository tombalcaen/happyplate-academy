const mongoose = require('mongoose');
const config = require('../config/database');

const recipesSchema = mongoose.Schema({
    // _id: {type: mongoose.Types.ObjectId},
    name: {type: String, required: true},
    description: {type: String},
    tags: {type: Array},
    dateCreated: {type: String},
    datePublished:  {type: String},
    dateModified: {type: String},
    ingredients: {type: Array},
    recipeInstructions: {type: Array},
    servings:  {type: String},
    time_spend:  {type: Object},
    difficulty_index:  {type: String},
    health_index:  {type: String},
    nutrition: {type: Array},
    // review_total: {type: Number},
    // review_amount: {type: Number},
    images: {type: Array},
    views: {type: Number},
    source: {type: Object}
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const recipes = module.exports = mongoose.model('recipes', recipesSchema);

//GET
module.exports.getRecipes = function(callback){
    recipes.find({},{name: 1, time_spend: 1, difficulty_index: 1, health_index: 1, images: 1, dateCreated: 1, meal_type: 1},callback)
}

module.exports.getRecipesFor = function(tag,callback){
    console.log("model getrecipefor: " + tag)
    recipes.find({tags: tag},{name: 1, time_spend: 1, difficulty_index: 1, health_index: 1, images: 1, dateCreated: 1, meal_type: 1},callback)
}

module.exports.getRecipesById = function(_id,callback){
    console.log('models id: ' + _id)
    recipes.find({_id: mongoose.Types.ObjectId(_id)},callback)
}

//CREATE
module.exports.createRecipes = function(recipe,callback){
    recipe.save(callback)
}

//DELETE


//UPDATE
module.exports.incrementView = function(recipe_id,callback){
    console.log("model increment : " + recipe_id)
    recipe.update({_id: mongoose.Types.ObjectId(recipe_id)},{$inc:{views: +1}},callback)
}


// module.exports.deleteCourse = function(Course_id,callback){ 
//     courses.deleteOne({_id: mongoose.Types.ObjectId(Course_id)},callback);
// }



// module.exports.updateCourse = function(course,callback){

//     let newUpdate = {
//                     name: course.name, 
//                     descr: course.descr, 
//                     price: course.price, 
//                     status: course.status
//                     }

//     courses.findOneAndUpdate({_id: mongoose.Types.ObjectId(course._id)},newUpdate,{upsert:true},callback);
// }

