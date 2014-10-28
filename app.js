var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    models = require('./models/index'),
    session = require ('cookie-session'),
    flash = require('connect-flash'),
    bcrypt = require('bcrypt'),
    pg = require('pg'),
    engine = require('ejs-locals');


var app = express();

//To store local js and css files
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res){
	res.render('index.ejs');
});

app.get('/options', function (req, res){
	res.render('try.ejs');
});

app.get('/admin')





















app.listen(3000);