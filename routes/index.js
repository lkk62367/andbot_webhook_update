//Used for querying by _id
var ObjectId = require('mongodb').ObjectID; 

// index return all dogs
exports.andbot = function (req, res) {
	var db = req.db; 
	var collection = db.collection('webhook'); 
	collection.find().toArray(function (err, data) {
		if (data) {
			res.render('index',  {
				title:'Andbot webhook', 
				path:req.path, 
				webhooks:data
			}); 
		}
	}); 
}; 


exports.rugby = function (req, res) {
	var db = req.db; 
	var collection = db.collection('rugby'); 
	collection.find().toArray(function (err, data) {
		if (data) {
			res.render('rugby',  {
				title:'Rugby webhook', 
				path:req.path, 
				rugbys:data
			}); 
		}
	}); 
}; 

exports.angel = function (req, res) {
	var db = req.db; 
	var collection = db.collection('angel'); 
	collection.find().toArray(function (err, data) {
		if (data) {
			res.render('angel',  {
				title:'Angel webhook', 
				path:req.path, 
				angels:data
			}); 
		}
	}); 
}; 

