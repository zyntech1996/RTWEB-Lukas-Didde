const express = require('express')
const path = require('path')
var app = express();
var router = require('./routes');
var MongoClient = require('./mongoDataBase').MongoClient;
const PORT = process.env.PORT || 5000


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', router);

var server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));




