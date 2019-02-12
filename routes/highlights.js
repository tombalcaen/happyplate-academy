const express = require('express');
const router = express.Router();
const moment = require("moment/moment");

const HighlightsList = require("../models/highlights");

router.get('/',(req,res,next)=>{
    console.log("in router highlights")
    HighlightsList.getHighlights((err, items)=>{        
        console.log(items)
    if(err){
        console.log(err.message)
        res.json({success: false, message: "failed to get chapters."})
      } else {
          res.json(items);
      }
    })
})

module.exports = router;