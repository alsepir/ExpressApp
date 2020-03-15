const express = require("express");
const homeController = require("./controllers/homeController.js");
const model = require("./models/Model");

const app = express();
 
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

app.use("/", function(request, response, next) {
  model.connectDB(request, response, next);
});

app.use("/", function(request, response, next) {
  homeController.index(request, response, next);
});

console.log("Express server listening on port 3000")
app.listen(3000);
