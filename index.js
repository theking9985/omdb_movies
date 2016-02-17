var express = require("express");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
var db = require("./models")

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + "/static"));

app.get("/", function(req, res) {
	res.render("index");
});


app.use("/movies", require("./controllers/movies"));

app.use("/show", require("./controllers/show"));

app.use("/favorites", require("./controllers/favorites"));

app.use("/comments", require("./controllers/comments"));

app.use("/tags", require("./controllers/tags"));

app.listen(3000, function() {
	console.log("listening to 3000");
});

