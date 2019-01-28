const mongoose = require('mongoose');
const config = require('../config/database');

// var ObjectID = require('mongodb').ObjectID

const coursesSchema = mongoose.Schema({
    // _id: {type: mongoose.Types.ObjectId},
    name: {type: String, required: true},
    descr: {type: String, required: true},
    price: {type: Number},
    status: {type: String}    
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const courses = module.exports = mongoose.model('courses', coursesSchema);

module.exports.getCourses = function(callback){
    courses.find({},callback)
}

module.exports.createCourse = function(course,callback){
    course.save(callback)
}

module.exports.updateCourse = function(course,callback){

    let newUpdate = {
                    name: course.name, 
                    descr: course.descr, 
                    price: course.price, 
                    status: course.status
                    }

    courses.findOneAndUpdate({_id: mongoose.Types.ObjectId(course._id)},newUpdate,{upsert:true},callback);
}

module.exports.deleteCourse = function(Course_id,callback){ 
    courses.deleteOne({_id: mongoose.Types.ObjectId(Course_id)},callback);
}