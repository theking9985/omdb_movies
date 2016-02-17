var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
	db.favorite.findAll({
		include: [db.tag]
	})
	.then(function(rows) {
		res.render("favorites", {rows: rows});	
	});
});

router.post("/", function(req, res) {
	var imdbID = req.body.imdbID;
	var title = req.body.title;
	var year = req.body.year;
	var poster = req.body.poster;
	db.favorite.findOrCreate({
		where: {imdbID: imdbID}
	}).spread(function(row) {
		row.updateAttributes({
			title: title,
			year: year,
			poster: poster
		});
		res.redirect("/favorites");
	})	
});

module.exports = router;