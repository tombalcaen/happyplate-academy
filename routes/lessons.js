const express = require('express');
const router = express.Router();
const LessonsList = require("../models/lessons");
// const GroceryList = require("../models/groceryList");

router.get('/lesson',(req,res,next)=>{    
    LessonsList.getLessons(req.query.chId,(err, items)=>{        
    if(err){
        res.json({success: false, message: "failed to get lesson."})
      } else {
        res.json(items);
      }
    })
})

// router.post('/',(req,res,next)=>{   
//     let newList = new GroceryList({
//         uid: req.body.uid,
//         name: req.body.name,        
//     });

//     GroceryList.addList(newList, (err, List)=>{
//         if(err){
//             res.json({success: false, message: "Failed to add new list."})
//         } else {
//             res.json({success: true, message: "List added!"});
//         }
//       });
// })

// router.delete('/',(req,res,next)=>{    
//     var test = req.query.items.split(",").map((data)=>{
//         return data;         
//     })

//     GroceryList.deleteList(test,(err,Item)=>{ 
//         if(err){
//             res.json({success: false, message: "could not delete lists."})
//         } else {
//             res.json({success: true, message: "List deleted!"})
//         }
//     })
// })

// router.post('/deleteAll',(req,res,next)=>{    
//     let uid = req.body.uid;

//     GroceryList.deleteAllForUid(uid,(err,Item)=>{ 
//         if(err){
//             res.json({success: false, message: "could not delete all."})
//         } else {
//             res.json({success: true, message: "List deleted!"})
//         }
//     })
// })

// router.post('/generate',(req,res,next)=>{
//     let uid = req.body.uid;

//     GroceryList.generateBasket(uid,(err,Item)=>{
//         if(err){            
//             res.json({success: false, message: "error when generating basket."})
//         } else {            
//             res.json({success: true, message: "basked generated!"})    
//         }            
//     })
// });

module.exports = router;