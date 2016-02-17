var express = require("express");
var router = express.Router();
var db = require("../models");


// // this also works but need to change ejs if use this one
// router.get("/:id", function(req, res) {
// 	var id = req.params.id;
// 	db.favorite.find({
// 		where: {id: id}
// 	}).then(function(favorite) {
// 		favorite.getComments()
// 		.then(function(comments) {
// 			res.render("comments", {favorite, comments});
// 		})
// 	})
// });

router.get("/:id", function(req, res) {
	var id = req.params.id;
	db.favorite.find({
		where: {
			id: id
		},
		include: [db.comment]
	}).then(function(favorites){
		// res.send(favorites);
		res.render("comments", {favorites});
	})
});

router.post("/:id", function(req, res) {
	db.comment.create({
		text: req.body.text,
		author: req.body.author,
		favoriteId: req.params.id
	}).then(function(){});
	res.redirect("/comments/" + req.params.id);
});



module.exports = router;