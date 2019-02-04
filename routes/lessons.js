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
    type: 1,
    status: req.body.status
  })

  LessonsList.addLesson(newLesson, (err, Lesson)=>{
    if(err){      
      console.log(err.message)
      res.json({success: false, message: "Failed to create new lesson"})
    } else {      
      res.json({success: true, message: "Lesson created!", lesson: Lesson});
    }
  })
})

router.delete('/delete',(req,res,next)=>{  
  LessonsList.deleteLesson(req.query._id,(err, item)=>{
    if(err){      
      res.json({success: false, message: "could not delete course."})
    } else {
      res.json({success: true, message: "Lesson deleted!", lesson: item})
    }
  })
})


router.post('/update_status',(req,res,next)=>{
  console.log("in router") 
  console.log(req.body)  
  let updateLesson = LessonsList({
    _id: req.body._id,
    chId: req.body.chId,
    name: req.body.name,
    body: req.body.body,
    files: req.body.files,
    created: req.body.created,
    last_edit: +moment(),
    type: req.body.type,
    status: req.body.status
  })

  LessonsList.updateLesson(updateLesson, (err, Lesson)=>{
    if(err){      
      console.log(err.message)
      res.json({success: false, message: "Failed to update lesson"})
    } else {      
      res.json({success: true, message: "Lesson updated!", lesson: Lesson});
    }
  })
})

module.exports = router;