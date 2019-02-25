const mongoose = require('mongoose');
const config = require('../config/database');

const recipe_ratesSchema = mongoose.Schema({
    // _id: {type: mongoose.Types.ObjectId},
    userId: {type: mongoose.Types.ObjectId, required: true},
    recipeId: {type: mongoose.Types.ObjectId, required: true},
    value: {type: Number, required: true},
    date: {type: Date, required: true}
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const recipe_rates = module.exports = mongoose.model('recipe_rates', recipe_ratesSchema);


// GET
module.exports.getRatesForUser = function(user_id,recipe_id,callback){ 
    recipe_rates.find({userId: mongoose.Types.ObjectId(user_id), recipeId: mongoose.Types.ObjectId(recipe_id)},callback)
}

//CREATE
module.exports.createRecipeRates = function(recipe_rate,callback){ 
    recipe_rate.save(callback)
}

module.exports.getRatingForId = function(query_info,callback){
    console.log('query info ' + query_info);
    // recipes.find({_id: mongoose.Types.ObjectId(_id)},callback)
}

//DELETE

//UPDATE


