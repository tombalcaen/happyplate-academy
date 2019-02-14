const mongoose = require('mongoose');
const config = require('../config/database');

const recipe_ratesSchema = mongoose.Schema({
    // _id: {type: mongoose.Types.ObjectId},
    userId: {type: mongoose.Types.ObjectId, required: true},
    value: {type: Number, required: true},
    date: {type: Date, required: true}
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const recipe_rates = module.exports = mongoose.model('recipe_rates', recipe_ratesSchema);

//CREATE
module.exports.createRecipeRates = function(recipe_rate,callback){
    console.log("model create recipe rate")
    recipe_rate.save(callback)
}

//DELETE

//UPDATE


