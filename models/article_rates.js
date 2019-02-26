const mongoose = require('mongoose');
const config = require('../config/database');

const article_ratesSchema = mongoose.Schema({
    // _id: {type: mongoose.Types.ObjectId},
    userId: {type: mongoose.Types.ObjectId, required: true},
    articleId: {type: mongoose.Types.ObjectId, required: true},
    value: {type: Number, required: true},
    date: {type: Date, required: true}
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const article_rates = module.exports = mongoose.model('article_rates', article_ratesSchema);


// GET
// module.exports.getRatesForUser = function(user_id,article_id,callback){ 
//     article_rates.find({userId: mongoose.Types.ObjectId(user_id), articleId: mongoose.Types.ObjectId(article_id)},callback)
// }

//CREATE

module.exports.createArticleLike = function(article_rate,callback){    
    // options = { upsert: true, new: true, setDefaultsOnInsert: true };
    article_rates.findOne({
        userId: mongoose.Types.ObjectId(article_rate.userId), articleId: mongoose.Types.ObjectId(article_rate.articleId)},
                                //    {$inc: { value: 1} },
        (err,result)=>{            
            if(!result || result.value < 5){                
                if(!result){
                    article_rate.save(callback);
                }
                else {
                    console.log("iiiiii")
                    article_rates.findOneAndUpdate({_id: mongoose.Types.ObjectId(result._id)},{$inc: {value: 1}},{upsert: true, new: true, projection: { "value" : 1 }},callback);
                }
            } else {                
                callback({message: "Could not increment because value exceeded 5"},result)
            }        
        })
}

// module.exports.createRecipeRates = function(article_rate,callback){ 
//     article_rate.save(callback)
// }

//DELETE

//UPDATE


