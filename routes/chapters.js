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

    console.log(req.query.cId)

    console.log("in route chapters")
    ChaptersList.getChaptersForCid(req.query.cId,(err,items)=>{
        if(err){            
            res.json({success: false, message: "failed to get chapters."})
        } else {
            console.log("return to sender")
            console.log(items)
            res.json(items)
        }
    })
})

module.exports = router;