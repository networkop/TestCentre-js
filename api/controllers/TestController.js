var connection = require('connect-network-device');

module.exports = {
	index: function (req, res, next) {
		res.view();
	},
	
	ping: function(req, res, next) {
		console.log('inside ping function');
		console.log(req.socket.id);
		Test.findOne({socket:req.socket.id}).exec(function findOneCB(err,found){
			if (err) return next(err);
			connection.to('172.16.0.1', 'ssh', 'ping 8.8.8.8', found.id);
		});
		return res.ok();

	},
	trace: function(req, res, next) {
		console.log('inside traceroute function');
		console.log(req.socket.id);
		Test.findOne({socket:req.socket.id}).exec(function findOneCB(err,found){
			if (err) return next(err);
			connection.to('172.16.0.1', 'ssh', 'traceroute 8.8.8.8', found.id);
		});
		return res.ok();
	},
	
	
	subscribe: function(req, res) {
		console.log('inside subscribe function ' );
		console.log(req.method);
		console.log(req.url);
		console.log(req.socket.id);
		Test.findOne({id:req.socket.id}).exec(function findOneCB(err,found){
			if (err) return next(err);
			res.send(200);
		});
		Test.create({socket:req.socket.id}).exec(function createCB(err, created){
			if (err) return next(err);
			Test.subscribe(req.socket, created);
		});
		//Test.findOrCreate({id:req.socket.id},{id:req.socket.id}).exec(function createFindCB(err,record) {
			
		//});
		//Test.find({}).exec(function(e,tests){
	//		Test.subscribe(req.socket, tests);
	//		});
		//res.send(200);
	}
};