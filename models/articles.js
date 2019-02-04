const mongoose = require('mongoose');

const articlesSchema = mongoose.Schema({
    // _id: {type: mongoose.Types.ObjectId},
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    tags: {type: Array},
    created_date: {type: String},
    posted_date: {type: String},
    last_edit_date: {type: String},
    text: {type: Object}
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const articles = module.exports = mongoose.model('articles', articlesSchema);

//GET
module.exports.getArticles = function(callback){
    console.log("model get articles")
    articles.find({},callback)
}

//CREATE
module.exports.createArticle = function(article,callback){
    article.save(callback)
}

// module.exports.updateArticle = function(article,callback){

//     // let newUpdate = {
//     //                 name: course.name, 
//     //                 descr: course.descr, 
//     //                 price: course.price, 
//     //                 status: course.status
//     //                 }

//     courses.findOneAndUpdate({_id: mongoose.Types.ObjectId(course._id)},newUpdate,{upsert:true},callback);
// }

//DELETE
module.exports.deleteArticle = function(Article_id,callback){ 
    articles.deleteOne({_id: mongoose.Types.ObjectId(Article_id)},callback);
}