var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/:id", function(req, res) {
	var id = req.params.id;
	db.favorite.find({
		where: {
			id: id
		},
		include: [db.tag]
	}).then(function(favorite) {
		res.render("tags", {favorite});
	})
});

router.post("/:id", function(req, res) {
	var id = req.params.id;
	db.favorite.findById(id)
	.then(function(favorite) {
		db.tag.findOrCreate({
			where: {
				tag: req.body.tag
			}
		}).spread(function(tag) {
			db.tagsFavorites.create({
				tagId: tag.id,
				favoriteId: favorite.id				
			}).then(function() {
				res.redirect("/tags/" + favorite.id);
			})
		})
	})
});

router.get("/showtags/:id", function(req, res) {
	var id = req.params.id;
	db.tag.findAll({
		where: {
			id: id
		},
		include: [db.favorite]
	}).then(function(tag) {
		res.render("showtags", {tag:tag});
	})
});

module.exports = router;