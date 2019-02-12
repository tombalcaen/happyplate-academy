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
    highlights.find({},callback)
    .populate('recipes')
    .populate('articles')
}