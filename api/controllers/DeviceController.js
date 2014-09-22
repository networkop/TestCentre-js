/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var connection = require('connect-network-device');

module.exports = {
	
	command: function(req, res, next) {

		Device.findOneById(req.param('sourceID'),function findOneCB(err, found){
			if (err) return next(err);
			sourceIP = found.ip;
		});
		Device.findOneById(req.param('destinationID'), function findOneCB(err, found){
			if (err) return next(err);
			destIP = found.ip;
		});


		Test.findOne({socket:req.socket.id}).exec(function findOneCB(err,found){
			if (err) return next(err);
			connection.to(sourceIP, 'ssh', req.param('command') + " " + destIP, found.id);
		});		
		return res.send(200);
	}
};

