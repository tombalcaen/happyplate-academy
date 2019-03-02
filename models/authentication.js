const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/database');

const userSchema = mongoose.Schema({
    fullName: { type: String, required: true},
    email: { type: String, required: true},
    isAdmin: {type: Boolean},
    // username: { type: String, required: true},
    password: { type: String, required: true},
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email,callback){ 
    console.log(email)
    const query = {email : email}
    User.findOne(query, callback);
}

module.exports.registerUser = function(user,callback){ 
    bcrypt.genSalt(10,(err, salt)=>{        
        bcrypt.hash(user.password, salt, (err, hash)=>{      
            if(err) throw err;
            user.password = hash;            
            user.save(callback);
        })
    })
}

module.exports.comparePassword = function(candidate_pass, hash, callback){    
    bcrypt.compare(candidate_pass,hash, (err,isMatch)=>{        
        if(err) throw err;
        callback(null, isMatch);
    })
}