
const express=require('express');
const regController=require('../controller/register')
const loginController=require('../controller/login')
const saveController= require('../controller/saveCsvData')
const regRoute = express.Router();

var app = express();

    // regRoute.route('/api',(req,res) => res.status(200).send({
    //     message:"welcome to route api"}));    
    regRoute.route('/api/register').post(regController.addUser);
    //app.get('/api/users', regController.list);
    //app.get('/api/users/username', regController.retrieve);
    regRoute.route('/api/saveCsvData').post(saveController.addCsvData)
    regRoute.route('/api/csvdata/delete').post(saveController.deleteRow)
    //=======login api======//
    regRoute.route('/api/login').post(loginController.login);

    module.exports = regRoute;