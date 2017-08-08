var express = require('express');
var router = express.Router();

router.use("/stock", require("./stock.js"));

router.get("/", function(req, res){
  res.json({response: "home route"});
});

module.exports = router;
