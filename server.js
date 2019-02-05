const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
// const passport = require('passport');
var db;
const courses = require('./routes/courses');
const chapters = require('./routes/chapters');
const lessons = require('./routes/lessons');
const articles = require('./routes/articles');
const recipes = require('./routes/recipes');

const config = require('./config/database');

//mongodb middleware 
const connect = mongoose.connect(config.mlab_uri, {useNewUrlParser: true});
// const connect = mongoose.createConnection(config.uri);

// connect.on('connected',()=>{
mongoose.connection.on('connected',()=>{
  console.log("Database connection ready");
});

// let gfs;
mongoose.connection.once('open',()=>{
    console.log("- connection open -");
    gfs = Grid(mongoose.connection.db,mongoose.mongo);    
})

//create storage engine
const storage = new GridFsStorage({
    db: connect
  });
  const upload = multer({ storage });

// connect.on('error',(err)=>{
mongoose.connection.on('error',(err)=>{
  console.log("database error: " + err)
})

const app = express();

//enable cors middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //res.header('Access-Control-Allow-Headers', 'Authorization');
    next();
}
app.use(allowCrossDomain);

//bodyparser middleware
app.use(bodyParser.json({limit: '16mb'})); //,{limit: '16mb'}
// app.use(express.bodyParser({limit: '50mb'}));

//passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);

//serve static files, this is the base of our front end: aka the angular app
var distDir = __dirname + "/dist/happyplate-academy/";
app.use(express.static(distDir));

//routes middelware
app.use('/course', courses);
app.use('/chapter', chapters);
app.use('/lesson', lessons);
app.use('/article', articles);
app.use('/recipe', recipes);

var server = app.listen(process.env.PORT || 3000,()=>{
    console.log("App now running on port", server.address().port);
    console.log(__dirname)
})

/*mongodb.MongoClient.connect(process.env.MONGODB_URI || config.uri,{ useNewUrlParser: true }, function (err, client) { // 
    if(err){
        console.log(err)
    } else console.log(client)

    //db = client.db("db1");
    db = client.db("heroku_90qwhmmx");    
    console.log("Database connection ready");

    var server = app.listen(process.env.PORT || 3000,()=>{
        console.log("App now running on port", server.address().port);
        console.log(__dirname)
    })

   //client.close();
});*/

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.get('/files/delete', (req,res)=>{
    gfs.db.collection('fa' + '.chunks').remove({_id:"5c4aec75205e3907cf8daae2"}, (err,files)=>{
        if(err){
            return res.json({err: 'error occured.'})
        }
        else return res.json(files);
    })
})


// app.get('/files', (req,res)=>{
//     gfs.files.find().toArray((err,files)=>{
//         //check if files exist
//         if(!files || files.length == 0){
//             return (res.status(404).json({err: 'no files exist'}))
//         } 
//         return res.json(files);
//     });
// })

app.get('/files', (req,res)=>{ //:filename
    console.log(req.query.filename)
    gfs.findOne({filename: req.query.filename},(err,file)=>{
        console.log(file)
        //check if files exist
        if(!file || file.length == 0){
            return (res.status(404).json({err: 'no file exist'}))
        } 
        return res.json(file);
    });
})

app.get('/image', (req,res)=>{    
    gfs.findOne({filename: req.query.filename},(err,file)=>{
        //check if files exist
        if(!file || file.length == 0){
            return (res.status(404).json({err: 'no file exist'}))
        } 
        //check if img
        if(file.contentType == "image/png" || file.contentType == "image/jpeg"){
            //read output to browser            
            const readstream = gfs.createReadStream(file.filename)
            // res.contentType("blob");
            readstream.pipe(res)
        } else {
            res.status(404).json({err: 'not an image'})
        }
    });
})

app.get('/images', (req, res)=>{    
    console.log(req.query)
    gfs.files.find().toArray((err,files)=>{
        //check if files exist
        if(!files || files.length == 0){
            // res.render('images', {files : false});
        }  else {
            files.map((file)=>{
                if(file.contentType == "image/png" || file.contentType == "image/jpeg"){
                    
                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res)
                    // readstream.on('data',(chunk)=>{
                    //     bufs.push(chunk)
                    // })
                    // readstream.on('end', function() {
                    //     const fbuf = Buffer.concat(bufs);
                    //     readstream.pipe(res)
                    // });
                    // console.log(bufs)
                    // file.isImage = true;
                } else {
                    res.status(404).json({err: 'not an image'})
                    // file.isImage = false;
                }
            });
            // res.json(files)
            // res.render('images', {files : files});
        }        
    });
})

// app.get('/images', (req,res)=>{   
//     console.log(req) 
//     gfs.files.find().toArray((err,file)=>{
//         //check if files exist
//         if(!file || file.length == 0){
//             return (res.status(404).json({err: 'no file exist'}))
//         } 
//         //check if img
//         if(file.contentType == "image/png" || file.contentType == "image/jpeg"){
//             //read output to browser            
//             const readstream = gfs.createReadStream(file.filename)
//             // res.contentType("blob");
//             readstream.pipe(res)
//         } else {
//             res.status(404).json({err: 'not an image'})
//         }
//     });
// })

app.post('/upload',upload.array('file'),(req,res,next)=>{    
    res.json({file: req.files, body: req.body})
})

/*
app.get('/inventory',(req,res)=>{    
    db.collection('inventory').find({}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get contacts.");
        } else {
          res.status(200).json(docs);
        }
      });
});

app.get('/inventory/expired',(req,res)=>{   
    console.log(req.params) 
    db.collection('inventory').find({"expiration_date": {$lt : new Date()}}).toArray(function(err, docs) {        
        if (err) {
          handleError(res, err.message, "Failed to get contacts.");
        } else {
          res.status(200).json(docs);
        }
      });
});

app.get('/inventory/:id',(req,res)=>{    
    db.collection('inventory').find({"_id" : new mongodb.ObjectID(req.params.id)}, (err, result)=>{
        if(err){
            handleError(res, err.message, "failed to get item.")
        } else {
            res.status(200).json(result);
        }
    })
})

app.post('/inventory',(req,res)=>{
    var newInvItem = req.body;
    newInvItem.expiration_date = new Date(newInvItem.expiration_date);
    newInvItem.createDate = new Date();

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection("inventory").insertOne(newInvItem, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new inventory item.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
        });
    }
})

app.delete("/inventory/:id", function(req, res) {        
    var test = req.params.id.split(",").map((data)=>{
        return new mongodb.ObjectID(data);         
    })

    db.collection('inventory').remove({"_id": { $in: test}}, function(err, result) {            
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(200).json(req.params.id);
        }
    });        

    // db.collection('inventory').deleteOne({"_id": new objectId(req.params.id)}, function(err, result) {
    //   if (err) {
    //     handleError(res, err.message, "Failed to delete contact");
    //   } else {
    //     res.status(200).json(req.params.id);
    //   }
    // });
  });*/

