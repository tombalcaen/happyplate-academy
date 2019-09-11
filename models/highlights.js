const mongoose = require('mongoose');
const config = require('../config/database');

const highlightSchema = mongoose.Schema({    
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref:'recipes' }],
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref:'articles' }],    
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const highlights = module.exports = mongoose.model('highlights', highlightSchema);

//GET
module.exports.getHighlights = function(callback){
    // let filter = {
    //     name: 1,
    //     dish_type: 1,
    //     ingr: 1,
    //     servings: 1,
    //     source: 1,
    //     steps: 1,
    //     time_spend: 1
    // }
    highlights.find({},callback)
    .populate('recipes')
    .populate('articles')
}