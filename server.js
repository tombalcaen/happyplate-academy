const express = require("express");
const session = require('express-session')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
require('./config/passport')(passport);

// const Grid = require('gridfs-stream');
// const GridFsStorage = require('multer-gridfs-storage');

var db;
const courses = require('./routes/courses');
const chapters = require('./routes/chapters');
const lessons = require('./routes/lessons');
const articles = require('./routes/articles');
const recipes = require('./routes/recipes');
const highlights = require('./routes/highlights');
const authentication = require('./routes/authentication');

const config = require('./config/database');

//mongodb middleware 
const connect = mongoose.connect(config.uri, {useNewUrlParser: true});
// const connect = mongoose.createConnection(config.uri);

// connect.on('connected',()=>{
mongoose.connection.on('connected',()=>{
  console.log("Database connection ready");
});

// let gfs;
mongoose.connection.once('open',()=>{
    console.log("- connection open -");
    // gfs = Grid(mongoose.connection.db,mongoose.mongo);    
})

// connect.on('error',(err)=>{
mongoose.connection.on('error',(err)=>{
  console.log("database error: " + err)
})

//create storage engine
// const storage = new GridFsStorage({
//     db: connect
//   });
//   const upload = multer({ storage });

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

//serve static files, this is the base of our front end: aka the angular app
var distDir = __dirname + "/dist/happyplate-academy/";
app.use(express.static(distDir));

//express-session
app.use(session({'secret': 'h4ppypl4te', 
                resave: false, 
                saveUninitialized: true,
                }))

//passport
app.use(passport.initialize());
app.use(passport.session());

//routes middelware
app.use('/course', courses);
app.use('/chapter', chapters);
app.use('/lesson', lessons);
app.use('/article', articles);
app.use('/recipe', recipes);
app.use('/highlight', highlights);
app.use('/auth', authentication);

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

