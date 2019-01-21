const mongoose = require('mongoose');

const config = require('../config/database');
const lessonModel = require('../models/lessons');

const chaptersSchema = mongoose.Schema({
    uid: {type: String},
    name: {type: String, required: true},
    cId: {type: String},
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
    chapters.find({cId: courseId},callback)
    .populate('lessons');        
}

module.exports.createChapter = function(chapter,callback){    
    chapter.save(callback)
}
