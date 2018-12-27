
var express = require('express');
var Sequelize = require('sequelize')
var app = express();
cors = require('cors')
app.use(cors());
const passport = require('passport');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var models =require('./models');
const allRoute=require('./route/route');
require('./auth/google/passport')()
var googleRoute= require('./auth/google');
var configAuth= require('./auth/google/auth')


app.use(passport.initialize());
app.use(passport.session());


app.get('/success', function(req, res) {

    res.write('callback google login success'); 
    res.end();
  });
     
//var connectionString = "postgres://postgres:123@localhost:5432/assignment";
//var connection = new Sequelize(connectionString, {dialect: 'postgres'})
app.get('/', function (req, res, next) {
    res.write("hii came")
    res.end();
});

app.use('/register',allRoute);
app.use('/auth',googleRoute);
 
models.sequelize.sync({force:true}).then( () => {
    app.listen(8000, function () {
        console.log('Server is running.. on Port 8000');
    });
 });
