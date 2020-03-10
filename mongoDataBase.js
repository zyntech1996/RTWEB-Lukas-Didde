var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://lutei:Master12345@cluster0-clnev.gcp.mongodb.net/test?retryWrites=true&w=majority";
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(url, function(err, db) {
if (err) throw err;
  var dbo = db.db("UserDBMudGame");
  var myobj = { name: "Lukas", character: "zyntech" };
  dbo.collection("UserDB").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
});
});
exports.modules = MongoClient;