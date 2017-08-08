var express = require('express');
var stockRouter = express.Router();
var path = require("path");

var mongoClient = require("mongodb").MongoClient;
var db;
var collection = "plaza";

mongoClient.connect("mongodb://localhost:27017/" + collection,
  function(err, database){
    if(err){
      console.log(err);
      return;
    }

    db = database;

    console.log("Connected to database");

  }
);

stockRouter.get("/", function(req, res){
  db.collection("quotes").find().toArray(function(err, results){
    res.json({response: "stock home route", result: results});
  });
});

module.exports = stockRouter;
