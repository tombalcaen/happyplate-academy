const express = require('express');
const router = express.Router();
const ChaptersList = require("../models/chapters");
const moment = require("moment/moment");

router.get('/',(req,res,next)=>{
    ChaptersList.getChaptersForCid(req.query.cId,(err,items)=>{
        console.log(items)
        if(err){            
            res.json({success: false, message: "failed to get chapters."})
        } else {            
            res.json(items)
        }
    })
})

router.get('/all',(req,res,next)=>{
    ChaptersList.getChaptersForCidAll(req.query.cId,(err,items)=>{
        console.log(items)
        if(err){            
            res.json({success: false, message: "failed to get chapters."})
        } else {            
            res.json(items)
        }
    })
})

router.post('/create',(req,res,next)=>{
    console.log("router chapter create")
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

router.post('/update',(req,res,next)=>{
    let updateChapter = new ChaptersList({
        _id: req.body._id,
        name: req.body.name,
        n: req.body.n,
        last_edit: +moment(),
    })

    ChaptersList.updateChapter(updateChapter, (err, Course)=>{        
        if(err){
            res.json({success: false, message: "Failed to update chapter."})
        } else {
            res.json({success: true, message: "Chapter updated!"});
        }
    })
})

router.delete('/delete',(req,res,next)=>{    
    ChaptersList.deleteChapter(req.query._id,(err,item)=>{
        if(err){
            res.json({success: false, message: "could not delete course."})
        } else {
            res.json({success: true, message: "Items deleted!"})
        }
    })    
})

router.delete('/deleteLesson',(req,res,next)=>{
    console.log("delte tha lesson")    
    console.log(req.query)
    console.log(req.params)
    ChaptersList.deleteFromArray(req.query, (err,Course)=>{
        console.log(Course)
        if(err){
            console.log(err.message);
            res.json({success: false, message: "failed to delete lesson in array."});
        } else {
            res.json({succes: true, message: 'lesson deleted.'});
        }
    })
})

router.post('/pushlesson',(req,res,next)=>{  
    console.log(req.body)
    ChaptersList.pushLesson(req.body, (err, Course)=>{        
        if(err){            
            res.json({success: false, message: "Failed to push lesson."})
        } else {            
            res.json({success: true, message: "Lesson pushed!"});
        }
    })
})

module.exports = router;