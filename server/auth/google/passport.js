
let passport = require('passport')
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// load up the user model
let models = require('../../models').User;

// load the auth variables
 var configAuth = require('./auth');


let setup= function() {
    console.log('inside setup')
      //console.log("hii")
  
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        models.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    passport.use(new GoogleStrategy({
    
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL

    },
    (token, refreshToken, profile, done) => {

         //console.log("=token========",token);
            // console.log(profile);
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            models.findOne({ where:{'username' : profile.displayName} })
            .then((user,err)=>{
                if (err) 
                    return done(err);

                if (user) {
                    console.log("hai re ========>",user.username);
                // if a user is found, log them in
                    return done(null, user);
                } 
                else {
                    // if the user isnt in our database, create a new user
                    console.log("aayaaaaa======")
                    var newUser = new models();

                    // set all of the relevant information
                    //newUser.google.id    = profile.id;
                    //newUser.google.token = token;
                    newUser.username  = profile.displayName;
                    //newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    return newUser.save()
                    // function(err) {
                    //     if (err) {
                    //         console.log("err =======>", err)
                    //         // throw err;
                    //         return done(err, null);
                    //     }
                    //     console.log("no err======>", err)
                    //     return done(null, newUser);
                    // });
            }
            })
            .then(function(data){
                //console.log("data saved=====>",data.dataValues.username);
                
                done(null, data)
            })
            .catch(err =>{
                console.log("error came======")
                done(err)
            }) 
                
           // });
        });

    }));

  

}
module.exports=setup;
