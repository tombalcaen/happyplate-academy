const express = require('express');
const router = express.Router();
const passport = require('passport');
// const ChaptersList = require("../models/chapters");
const User = require('../models/authentication');
const moment = require("moment/moment");
const jwt = require('jsonwebtoken');
const config = require('../config/database')

// create the login get and post routes
router.get('/', (req, res) => {
  console.log("mlkj")
  console.log(req.query)
})

router.get('/login', (req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)  
  res.json(`You got the login page!\n`)
})
  
router.post('/login', (req, res) => {
  console.log('Inside POST /login callback function')
  console.log(req.body)
  res.json(`You posted to the login page!\n`)
})

//authenticate
router.post('/',(req,res,next)=>{  
  const email = req.body.email;
  const password = req.body.password;    

  User.getUserByEmail(email,(err,user)=>{

    console.log(user)

      if(err) throw(err);
      if(!user){
          return res.json({success: false, message: "user not found!"})
      }
      
      User.comparePassword(password,user.password,(err,isMatch)=>{
        if(err) throw(err);
        if(isMatch){    
          console.log("after compare password")
          console.log(user)
                           
          const token = jwt.sign(user.toJSON(),config.secret,{expiresIn: 804600})            
          res.json({
              success: true, 
              token: 'JWT ' +token, 
              user:{
                  id: user._id,
                  fullName: user.fullName,
                  isAdmin: user.isAdmin,
                  // username: user.username,
                  email: user.email
                  }
          })
        } else {
          return res.json({success: false, message: "user not found!"})
        }
      })
  })
})

//register
router.post('/register',(req,res,next)=>{
  console.log("in register")
  let newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      // username: req.body.username,
      password: req.body.password
  });
    
  User.registerUser(newUser, (err, user)=>{
    if(err){
      console.log(err.message)
      res.json({success: false, message: "failed to register user."})
    } else {
      res.json({success: true, message: "user registered"});      
    }
  })
})

passport.serializeUser(function(user_id, done) {
  console.log("serializeUser")
  console.log(user_id)
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  User.findById(user_id, function (err, user) {
    console.log("DEserialize")
    console.log(user)
    // done(null, user_id);
    done(err, user);
  });
    
});

module.exports = router;

// router.get('/',(req,res,next)=>{     
//     User.getUserByUsername(req.query.username,(err,user)=>{
//         console.log(err)
//         console.log(user)
//         if(err) res.json({success: false, message: "user not found!"})
//         else { 
//             res.json(user)
//         } 
//     })    
// })

// //authenticate
// router.post('/authenticate',(req,res,next)=>{
//     const username = req.body.username;
//     const password = req.body.password;    

//     User.getUserByUsername(username,(err,user)=>{
//         if(err) throw(err);
//         if(!user){
//             return res.json({success: false, message: "user not found!"})
//         }
         
//         User.comparePassword(password,user.password,(err,isMatch)=>{
//           if(err) throw(err);
//           if(isMatch){              
//             const token = jwt.sign(user.toJSON(),config.secret,{expiresIn: 804600})            
//             res.json({
//                 success: true, 
//                 token: 'JWT ' +token, 
//                 user:{
//                     id: user._id,
//                     name: user.name,
//                     username: user.username,
//                     email: user.email
//                     }
//             })
//           } else {
//             return res.json({success: false, message: "user not found!"})
//           }
//         })
//     })
// })

// //profile
// router.get('/profile', passport.authenticate('jwt',{session:false}),(req,res,next)=>{        
//     res.json({user: req.user});
// })
