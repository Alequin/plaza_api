var express = require('express');
var stockRouter = express.Router();
var path = require("path");

var mongoClient = require("mongodb").MongoClient;

function connect(action){
  mongoClient.connect("mongodb://localhost:27017/plaza",
    function(err, database){
      if(err){
        console.log(err);
        return;
      }

      console.log("Connected to database");
      db = database;
      action(db.collection("stock"));
      db.close
    }
  );
}

stockRouter.get("/", function(req, res){
  connect(function(collection){
    collection.find().toArray(function(err, results){
      res.json({response: "stock home route", result: results});
    });
  });
});

stockRouter.get("/name/:name", function(req, res){
  connect(function(collection){
    collection.find({name: req.params.name}).toArray(function(err, results){
      res.json({response: "stock single item by name route", result: results});
    });
  });
});

stockRouter.get("/category/:category", function(req, res){
  connect(function(collection){
    collection.find({category: req.params.category}).toArray(function(err, results){
      res.json({response: "stock single item by category route", result: results});
    });
  });
});

stockRouter.post("/", function(req, res){
  connect(function(collection){
    collection.save(req.body, function(err, results){
      res.json({response: "stock save route", result: results});
    });
  });
});


stockRouter.delete("/", function(req, res){
  connect(function(collection){
    collection.deleteMany(function(err, results){
      res.json({response: "stock delete all route", result: results});
    });
  });

});

module.exports = stockRouter;
