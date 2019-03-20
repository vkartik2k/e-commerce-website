const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
const users = require('./database/index.js').users

passport.serializeUser(function(user, done){
    console.log('hello')
    done(null, user.mobileno)
})

passport.deserializeUser(function(mobileno, done){
    console.log('hello')
    users.findOne({
        where : {
            mobileno : mobileno
        }
    },function(err, user){
        if(err) return done(err);
        if(!user){
            return done(new Error("NO SUCH USER"));
        }
        return done(null, user);
    })

})

passport.use('login', new passportStrategy(function(mobileno, password, done){
    users.findOne(
        {where: {
            mobileno:mobileno,
            password: password
        }}
    ,function(err, User) {
        if(err) return done(err,false,{message: "No such user"});
        if(User){
            return done(null, User,{message: "No such user"});
        }
        return done(null, false,{message: "No such user"});
    })
        
    }
))

exports = module.exports = passport