const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/authentication');
const config = require('../config/database');

module.exports = (passport)=>{
    let opts = {};   
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
        console.log(jwt_payload._id)
        User.getUserById(jwt_payload._id,(err,user)=>{
            console.log(err)
            console.log(user)
            if(err) return done(err,false); 
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }))
}