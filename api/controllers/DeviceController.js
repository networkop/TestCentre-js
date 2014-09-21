/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var connection = require('connect-network-device');

module.exports = {
	
	command: function(req, res, next) {
		sourceID = req.param('sourceID');
		destID = req.param('destinationID');
		command = req.param('command');
		destIP = "";
		sourceIP = "";
		Device.findOne({id:sourceID}).exec(function findOneCB(err, found){
			if (err) return next(err);
			sourceIP = found.ip;
		});
		Device.findOne({id:destID}).exec(function findOneCB(err, found){
			if (err) return next(err);
			destIP = found.ip;
		});

		console.log(sourceID,destID,command);
		Test.findOne({socket:req.socket.id}).exec(function findOneCB(err,found){
			if (err) return next(err);
			connection.to(sourceIP, 'ssh', command + " " + destIP, found.id);
		});		
		return res.send(200);
	}
};

