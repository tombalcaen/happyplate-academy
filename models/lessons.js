// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/database');

const ChaptersList = require("../models/chapters");

const lessonsSchema = mongoose.Schema({
    uid: {type: String},
    chId: {type: String},
    name: {type: String, required: true},    
    body: {type: String},
    files: {type: Array},
    created: {type: String},
    last_edit: {type: String},
    type: {type: Number}, //1: text-file; 2: audio-file; 3: video-file
    status: {type: String} //draft, published
});

// const GroceryList = module.exports = mongoose.model('groceryList', groceryListSchema);
const lessons = module.exports = mongoose.model('lessons', lessonsSchema);

// GET
module.exports.getLessons = function(_id,callback){    
    lessons.findById({_id: mongoose.Types.ObjectId(_id)},callback)
}

//CREATE
module.exports.addLesson = function(lesson,callback){    
    lesson.save(callback);    
}

//UPDATE
module.exports.updateLesson = function(lesson,callback){     
    lessons.findOneAndUpdate({_id: mongoose.Types.ObjectId(lesson._id)},lesson,callback);
}

//DELETE
module.exports.deleteLesson = function(_id,callback){ 
    lessons.deleteOne({_id: mongoose.Types.ObjectId(_id)},callback);
}

// module.exports.addList = function(list,callback){    
//     list.save(callback);
// }

// module.exports.deleteList = function(list,callback){ 
//     list.deleteMany({_id: { $in: list}},callback);
// }

// module.exports.deleteAllForUid = function(uid,callback){
//     GroceryList.deleteMany({uid: uid},callback)
// }

// module.exports.generateBasket = function(uid,callback){
//     this.deleteAllForUid(uid,(err,res)=>{
//         if(err) {
//             console.log("errrrrrr")
//             console.log(err)
//             callback({success: false, message:"failed to generate basket. (delete old)"})
//         }
//         favorite.getFavorite(uid,(err, items)=>{
//             if(err){
//                 console.log("getfavorites error;")
//                 console.log(err)
//                 callback({success: false, message: "failed to generate basket. (get favorites)"})
//             } else {                
//                 callback(items.map((data)=>{
//                     let newList = new GroceryList({
//                         uid: data.uid,
//                         name: data.name,
//                     });
                    
//                     this.addList(newList,(a,b)=>{
//                         console.log(a)
//                         console.log(b)
//                     })
//                 }))
//             }
//         });
//     })
// }