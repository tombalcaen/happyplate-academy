const mongoose = require('mongoose');

const config = require('../config/database');
const lessonModel = require('../models/lessons');

const chaptersSchema = mongoose.Schema({
    uid: {type: String},
    name: {type: String, required: true},
    n: {type: Number},
    created: {type: String},
    last_edit: {type: String},
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref:'lessons' }]
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const chapters = module.exports = mongoose.model('chapters', chaptersSchema);

module.exports.getChapters = function(callback){
    chapters.find({},callback)
}

module.exports.getChaptersForCid = function(courseId,callback){    
    // chapters.findById({courseId},callback);
    // var findData = function (userInput, callback) {   
    // chapters.find({cId: courseId}).exec(function (err, result) {            
    //     result.map((r)=>{
    //         console.log(r._id)            
    //         lessonModel.l getLessons(r._id,(result2)=>{
    //             console.log(result2)
    //         })                      
    //     });
    // })

    chapters.find({cId: courseId})
    .populate('lessons') // multiple path names in one requires mongoose >= 3.6
    .exec(function(err, usersDocuments) {
        console.log(usersDocuments)
        // handle err
        // usersDocuments formatted as desired
    });
        
}
