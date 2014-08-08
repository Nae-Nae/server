//models for crm project
var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('crmdb', server);



db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'crmdb' database");
        db.collection('crmdb', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'crmdb' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.register = function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var register_data = req.body;
	db.collection('crmdb', function(err, collection) {
		collection.insert(register_data, function(err, result) {
			if (err) {
				console.log("error");
				res.send({'error': 'an error occurred'});
			} else {
				console.log('success. ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

var populateDB = function() {
	db.collection('crmdb', function(err, collection) {
        collection.insert({}, {safe:true}, function(err, result) {});
    });
};