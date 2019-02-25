const express = require('express');
const router = express.Router();
const moment = require("moment/moment");

const HighlightsList = require("../models/highlights");

router.get('/',(req,res,next)=>{    
    HighlightsList.getHighlights((err, items)=>{                
    if(err){
        console.log(err.message)
        res.json({success: false, message: "failed to get chapters."})
      } else {
          res.json(items);
      }
    })
})

module.exports = router;