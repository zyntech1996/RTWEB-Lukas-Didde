const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
//var db = require("./mongoDataBase");
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://lutei:Master12345@cluster0-clnev.gcp.mongodb.net/test?retryWrites=true&w=majority";


MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("UserDBMudGame");
  var myobj = { name: "Lukas", character: "zyntech" };
      //console.log("1 document inserted");
      db.close();
  });

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/game', (req, res) => res.render('pages/game'))
  .get('/db', (req, res) => res.render('pages/db'))
  .get('/gamelogic.js', (req, res) => res.sendFile(path.join(__dirname, 'views/pages/gamelogic.js')))
  .get('/highscores.json', (req, res) => res.sendFile(path.join(__dirname, 'highscores.json')))
  .get('/mongoDataBase', (req, res) => res.sendFile(path.join(__dirname, 'mongoDataBase.js')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


 