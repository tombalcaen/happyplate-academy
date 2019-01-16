const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
// const passport = require('passport');
var db;
const courses = require('./routes/courses');
const chapters = require('./routes/chapters');
const lessons = require('./routes/lessons');

const config = require('./config/database');

const app = express();

//mongodb middleware
mongoose.connect(config.uri, {useNewUrlParser: true});

mongoose.connection.on('connected',()=>{
  console.log("Database connection ready");
});

mongoose.connection.on('error',(err)=>{
  console.log("database error: " + err)
})

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
app.use(bodyParser.json());

//passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);

//serve static files, this is the base of our front end: aka the angular app
var distDir = __dirname + "/dist/happyplateAcademy/";
app.use(express.static(distDir));

//routes middelware
app.use('/course', courses);
app.use('/chapter', chapters);
app.use('/', lessons);

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

