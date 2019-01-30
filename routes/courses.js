const express = require('express');
const router = express.Router();
const CoursesList = require("../models/courses");
// const GroceryList = require("../models/groceryList");

router.get('/',(req,res,next)=>{
    CoursesList.getCourses((err, items)=>{        
    if(err){
        res.json({success: false, message: "failed to get courses."})
      } else {
          res.json(items);
      }
    })
})

router.post('/create',(req,res,next)=>{
    
    let newCourse = new CoursesList({
        name: req.body.name,
        descr: req.body.descr,
        price: req.body.price,
        status: req.body.status
    })
    
    CoursesList.createCourse(newCourse, (err, Course)=>{        
        if(err){
            console.log(err.message)
            res.json({success: false, message: "Failed to add new item."})
        } else {
            res.json({success: true, message: "Item added!"});
        }
      });
})

router.post('/update',(req,res,next)=>{

    let updateCourse = new CoursesList({
        _id: req.body._id,
        name: req.body.name,
        last_edit: req.body.last_edit
    })

    CoursesList.updateCourse(updateCourse, (err, Course)=>{
        if(err){
            res.json({success: false, message: "Failed to update course."})
        } else {
            res.json({success: true, message: "Item updated!"});
        }
    })
})

router.delete('/delete',(req,res,next)=>{    
    CoursesList.deleteCourse(req.query._id,(err,item)=>{
        if(err){
            res.json({success: false, message: "could not delete course."})
        } else {
            res.json({success: true, message: "Items deleted!"})
        }
    })    
})

module.exports = router;