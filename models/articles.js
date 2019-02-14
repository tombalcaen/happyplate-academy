const mongoose = require('mongoose');

const articlesSchema = mongoose.Schema({
    // _id: {type: mongoose.Types.ObjectId},
    name: {type: String, required: true},
    description: {type: String},
    body: {type: String},
    tags: {type: Array},
    files: {type: Array},
    dateCreated: {type: String},
    datePublished: {type: String},
    dateModified: {type: String},
    contributor: {type: Object},
    status: {type: String}, //draft;published
    views: {type: Number},
    like_score: {type: Number},
    like_n: {type: Number}
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const articles = module.exports = mongoose.model('articles', articlesSchema);

//GET
module.exports.getArticles = function(callback){
    console.log("model get articles")
    articles.find({},{name: 1, files: 1, dateCreated: 1, contributor: 1},callback)
}

module.exports.getArticleById = function(_id,callback){
    console.log('models id: ' + _id)
    articles.find({_id: mongoose.Types.ObjectId(_id)},callback)
}

//CREATE
module.exports.createArticle = function(article,callback){
    console.log("in model create article")
    article.save(callback)
}

//DELETE
module.exports.deleteArticle = function(Article_id,callback){ 
    articles.deleteOne({_id: mongoose.Types.ObjectId(Article_id)},callback);
}

// UDPATE
module.exports.incrementView = function(Article_id,callback){    
    articles.update({_id: mongoose.Types.ObjectId(Article_id)},{$inc:{views: 1}},callback)
}

module.exports.incrementLike = function(Article_id,callback){    
    articles.update({_id: mongoose.Types.ObjectId(Article_id)},{$inc:{like_score: 1}},callback)
}

module.exports.decrementLike = function(Article_id,callback){    
    articles.update({_id: mongoose.Types.ObjectId(Article_id)},{$inc:{like_score: -1}},callback)
}