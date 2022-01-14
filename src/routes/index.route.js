const express = require("express"),
  index_router = express.Router();

/* GET home page. */
index_router.get("/", (req, res) => {
  res.status(200).send("Root route not exists, please move to /user");
});

module.exports = index_router;
