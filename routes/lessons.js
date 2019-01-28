const express = require('express');
const router = express.Router();
const moment = require("moment/moment");

const LessonsList = require("../models/lessons");
// const GroceryList = require("../models/groceryList");

router.get('/',(req,res,next)=>{    
    LessonsList.getLessons(req.query._id,(err, items)=>{        
    if(err){
        res.json({success: false, message: "failed to get lesson."})
      } else {
        res.json(items);
      }
    })
})

router.post('/create',(req,res,next)=>{
  let newLesson = new LessonsList({
    chId: req.body.chId,
    name: req.body.name,
    body: req.body.body,
    files: req.body.files,
    created: +moment(),
    last_edit: +moment(),
  })

  LessonsList.addLesson(newLesson, (err, Lesson)=>{
    if(err){      
      res.json({success: false, message: "Failed to create new lesson"})
    } else {      
      res.json({success: true, message: "Lesson created!", lesson: Lesson});
    }
  })
})

router.delete('/delete',(req,res,next)=>{
  console.log("delete")
  console.log(req.query)
  
})

module.exports = router;