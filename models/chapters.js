const mongoose = require('mongoose');

const config = require('../config/database');
const lessonModel = require('../models/lessons');

const chaptersSchema = mongoose.Schema({
    // _id: {type: mongoose.Schema.Types.ObjectId},
    // uid: {type: String},
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

module.exports.getChaptersForCidAll = function(courseId,callback){  
    chapters.find({cId: courseId},callback)
    .populate('lessons') //,null,
    .sort({n: 1});        
}

module.exports.getChaptersForCid = function(courseId,callback){  
    chapters.find({cId: courseId},callback)
    .populate('lessons',null,null,{match: { status: {$eq: 'published'}}}) //,null,
    .sort({n: 1});        
}

module.exports.createChapter = function(chapter,callback){        
    chapter.save(callback)
}

module.exports.updateChapter = function(chapter,callback){    
    let newUpdate = {
                    name: chapter.name,
                    last_edit: chapter.last_edit, 
                    n: chapter.n                   
                    }

    chapters.findOneAndUpdate({_id: mongoose.Types.ObjectId(chapter._id)},newUpdate,callback);
}

module.exports.deleteChapter = function(_id,callback){    
    chapters.deleteOne({_id: mongoose.Types.ObjectId(_id)},callback);
}

module.exports.deleteFromArray = function(lesson,callback){
    console.log(lesson)
    chapters.update({_id: mongoose.Types.ObjectId(lesson.chId)}, {$pull: {"lessons": mongoose.Types.ObjectId(lesson._id)}},callback)
}

module.exports.pushLesson = function(lesson,callback){
    chapters.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(lesson.lesson.chId)},
        { $push: {lessons: lesson.lesson._id}},
        callback)
}