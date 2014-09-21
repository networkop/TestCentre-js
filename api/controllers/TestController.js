
var connection = require('connect-network-device');

module.exports = {

	index: function (req, res, next) {
		Device.find({}).exec(function findCB(err, devices) {
		res.view({
			devices: devices
		});
		});
	},

	break: function(req, res, next) {
		Test.findOne({socket:req.socket.id}).exec(function findOneCB(err,found){
			if (err) return next(err);
			connection.abort(found.id);
		});
		return res.send(200);
	},
	
	subscribe: function(req, res) {
		console.log('inside subscribe function ' );
		console.log(req.socket.id);
		Test.findOne({id:req.socket.id}).exec(function findOneCB(err,found){
			if (err) return next(err);
			res.send(200);
		});
		Test.create({socket:req.socket.id}).exec(function createCB(err, created){
			if (err) return next(err);
			Test.subscribe(req.socket, created);
		});
	}
};