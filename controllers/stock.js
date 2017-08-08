var express = require('express');
var stockRouter = express.Router();
var path = require("path");

var mongoClient = require("mongodb").MongoClient;
var db;
var stock;

mongoClient.connect("mongodb://localhost:27017/plaza",
  function(err, database){
    if(err){
      console.log(err);
      return;
    }

    db = database;
    stock = db.collection("stock");
    console.log("Connected to database");
  }
);

stockRouter.get("/", function(req, res){
  stock.find().toArray(function(err, results){
    res.json({response: "stock home route", result: results});
  });
});

stockRouter.post("/", function(req, res){
  stock.save(req.body, function(err, results){
    res.json({response: "stock save route", result: results});
  });
});

module.exports = stockRouter;
