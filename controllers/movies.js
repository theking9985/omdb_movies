var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/", function(req, res) {
	var searchTerm = req.query.searchTerm;
	request(
		"http://www.omdbapi.com/?s=" + searchTerm,
		function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.render("movies", {data, searchTerm});
			}
		}
	)
});










module.exports = router;