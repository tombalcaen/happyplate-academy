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

module.exports = router;