const express = require('express');
const router = express.Router();
const ChaptersList = require("../models/chapters");
const moment = require("moment/moment");

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
    ChaptersList.getChaptersForCid(req.query.cId,(err,items)=>{
        if(err){            
            res.json({success: false, message: "failed to get chapters."})
        } else {            
            res.json(items)
        }
    })
})

router.post('/create',(req,res,next)=>{
    
    let newChapter = new ChaptersList({
        cId: req.body.cId,
        name: req.body.name,
        n: req.body.n,
        created: +moment(),
        last_edit: +moment(),
        lessons: []
    })
    
    ChaptersList.createChapter(newChapter, (err, Course)=>{    
        if(err){
            res.json({success: false, message: "Failed to add new item."})
        } else {
            res.json({success: true, message: "Item added!"});
        }
      });
})

module.exports = router;