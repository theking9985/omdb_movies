var db = require("./models");

// db.favorite.find({where: {id:10}})
// .then(function(favorite) {
// 	favorite.createComment({
// 		text: "This is another comment",
// 		author: "Foo Pizza"
// 	})
// 	.then(function(comment) {
// 	})
// })

// db.favorite.find({where: {id: 10}})
// .then(function(favorite) {
// 	favorite.getComments()
// 	.then(function(comment) {
// 		console.log("**********comment", comment[0].text);
// 	})
// });

db.favorite.findAll({
	include: [db.comment]
}).then(function(favorites) {
	console.log("*********favorites: ", favorites.comment);
});




























