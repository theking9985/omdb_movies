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

//edit form
router.get("/:id/editForm", function(req, res) {
	var id = req.params.id;
	res.render("editFavorite", {id});
});

//edit route
router.post("/:id/edit", function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.favorite.find({
		where: {
			id: id
		}
	}).then(function(favorite) {
		console.log("***********");
		console.log(req.body.title);
		favorite.updateAttributes({
			title: req.body.title
		}).then(function() {
			res.redirect("/favorites");
		});
	});
});

router.get("/:id/delete", function(req, res) {
	var id = req.params.id;
	db.favorite.destroy({
		where: {
			id: id
		}
	}).then(function() {
		res.redirect("/favorites")
	})
});

module.exports = router;








