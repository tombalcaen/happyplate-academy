const mongoose = require('mongoose');
const config = require('../config/database');

const coursesSchema = mongoose.Schema({
    uid: {type: String},
    name: {type: String, required: true},    
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const courses = module.exports = mongoose.model('courses', coursesSchema);

module.exports.getCourses = function(callback){
    courses.find({},callback)
}