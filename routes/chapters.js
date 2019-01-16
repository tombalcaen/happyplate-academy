const express = require('express');
const router = express.Router();
const ChaptersList = require("../models/chapters");
// const GroceryList = require("../models/groceryList");

// router.get('/',(req,res,next)=>{
//     ChaptersList.getChapters((err, items)=>{        
//     if(err){
//         res.json({success: false, message: "failed to get chapters."})
//       } else {
//           res.json(items);
//       }
//     })
// })

router.get('/',(req,res,next)=>{
    console.log("in route chapters")
    ChaptersList.getChaptersForCid("5c3b009e1c9d4400005321f5",(err,items)=>{
        if(err){
            res.json({success: false, message: "failed to get chapters."})
        } else {
            res.json(items)
        }
    })
})

module.exports = router;