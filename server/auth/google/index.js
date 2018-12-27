'use strict'

let express = require('express')
let passport = require('passport');

let router = express.Router();
let app=express();



app.get('/failure', function(req, res) {
  console.log("Failure redirected");
  res.write('faillll'); 
  res.end();
});


router.get('/google',passport.authenticate('google', {
    failureRedirect: '/failure',
    scope: [
      'profile',
      'email'
    ],
    session: false
  }),()=> {
    console.log("coming");
   
})

router.get('/google/callback', passport.authenticate('google',{
  //successRedirect:'/',
  //failureRedirect: '/failure',
  session: false
}), function(req, res) {
  console.log("response==================");
  res.redirect("http://localhost:3000/welcome");
  // res.redirect("/success");
 //res.status(200).send(res)
});

module.exports=  router;