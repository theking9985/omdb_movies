var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/:imdbID", function(req, res) {
	var imdbID = req.params.imdbID;
	request(
		"http://www.omdbapi.com/?i=" + imdbID,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.render("show", {data, imdbID});
			}
		}
	)
});


module.exports = router;