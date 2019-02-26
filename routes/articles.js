const express = require('express');
const router = express.Router();
const ArticleList = require("../models/articles");
const Article_ratesList = require('../models/article_rates');

const moment = require("moment/moment");

//GET
router.get('/',(req,res,next)=>{
    console.log("router get articles")
    ArticleList.getArticles((err, items)=>{        
    if(err){
        console.log(err.message)
        res.json({success: false, message: "failed to get courses."})
      } else {
          res.json(items);
      }
    })
})

router.get('/id',(req,res,next)=>{
  console.log('router id: ' + req.query._id)
  ArticleList.getArticleById(req.query._id,(err, article)=>{        
  if(err){
      console.log(err.message)
      res.json({success: false, message: "failed to get article."})
    } else {
        res.json(article);
    }
  })
})

//CREATE
router.post('/create',(req,res,next)=>{    
    let newArticle = new ArticleList({
      name: req.body.name,
      description: req.body.description,
      body: req.body.body,
      files: req.body.files,
      tags: req.body.tags,
      dateCreated: +moment(),
      datePublished: +moment(),
      dateModified: +moment(),
      contributor: {name: req.body.contributor.name, title: req.body.contributor.title},
      status: req.body.status, //draft;published
      like_score: 0, //from older method
      like_n: 0 //from older method
    })
  
    ArticleList.createArticle(newArticle, (err, Article)=>{
      if(err){      
        console.log(err.message)
        res.json({success: false, message: "Failed to create new article!"})
    } else {      
        res.json({success: true, message: "Article created!", article: Article});
      }
    })
  })

//DELETE


//UPDATE
router.post('/increment',(req,res,next)=>{    
  ArticleList.incrementView(req.body._id,(err,Article)=>{
      if(err){
          console.log(err.message);
          res.json({success: false, message: "Failed to increment view!"})
      } else {
          res.json({success: true, message: "incremented!"})
      }
  })
})

router.post('/increment_like',(req,res,next)=>{    
  ArticleList.incrementLike(req.body._id,(err,Article)=>{
      if(err){          
          res.json({success: false, message: "Failed to increment like!"})
      } else {
          res.json({success: true, message: "incremented!",article: Article})
      }
  })
})

router.post('/decrement_like',(req,res,next)=>{    
  ArticleList.decrementLike(req.body._id,(err,Article)=>{
      if(err){
          console.log(err.message);
          res.json({success: false, message: "Failed to decrement like!"})
      } else {
          res.json({success: true, message: "decremented!",article: Article})
      }
  })
})

router.post('/append_like',(req,res,next)=>{    
  let newArticle_rate = new Article_ratesList({
    userId: req.body.Uid,
    articleId: req.body.Aid,
    value: 1,
    date: +moment()
  })

  Article_ratesList.createArticleLike(newArticle_rate,(err,Article)=>{        
    if(err){
      res.json({success: false, message: "Failed to increment like!",article: Article})
    } else {
      ArticleList.incrementLike(req.body.Aid,(err,art)=>{
        if(err){          
            res.json({success: false, message: "Failed to increment like!"})
        } else {
            res.json({success: true, message: "incremented!",article: Article})
        }
      })        
      // res.json({success: true, message: "incremented!",article: Article})
    }
  })
})


module.exports = router;




// router.post('/create',(req,res,next)=>{
    
//     let newCourse = new CoursesList({
//         name: req.body.name,
//         descr: req.body.descr,
//         price: req.body.price,
//         status: req.body.status
//     })
    
//     CoursesList.createCourse(newCourse, (err, Course)=>{        
//         if(err){
//             console.log(err.message)
//             res.json({success: false, message: "Failed to add new item."})
//         } else {
//             res.json({success: true, message: "Item added!"});
//         }
//       });
// })

// router.post('/update',(req,res,next)=>{

//     let updateCourse = new CoursesList({
//         _id: req.body._id,
//         name: req.body.name,
//         last_edit: req.body.last_edit
//     })

//     CoursesList.updateCourse(updateCourse, (err, Course)=>{
//         if(err){
//             res.json({success: false, message: "Failed to update course."})
//         } else {
//             res.json({success: true, message: "Item updated!"});
//         }
//     })
// })

// router.delete('/delete',(req,res,next)=>{    
//     CoursesList.deleteCourse(req.query._id,(err,item)=>{
//         if(err){
//             res.json({success: false, message: "could not delete course."})
//         } else {
//             res.json({success: true, message: "Items deleted!"})
//         }
//     })    
// })