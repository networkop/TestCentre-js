/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {
	
	command: function(req, res, next) {
		var credentials = req.body;
		var sourceDevice, destIP;
		Device.findOneById(req.param('sourceID'),function findOneCB(err, found){
			if (!found || err) return next(err);
			sourceDevice = {
				hostname: found.hostname, 
				ipaddress: found.ipaddress,
				id: found.id
			};
		});
		Device.findOneById(req.param('destinationID'), function findOneCB(err, found){
			if (err) return next(err);
			destIP = found.ipaddress;
		});

		Test.findOne({socket:req.socket.id}).exec(function findOneCB(err,found){
			if (!found || err) return next(err);
			try {
				ConnectionManager.to(sourceDevice, 'ssh', req.param('command') + " " + destIP, found.id, credentials);
			} catch(error) {
				console.log("ERROR!! " + error );
				Test.publishUpdate(found.id, { output: JSON.stringify(error) });
			}
		});		
		return res.send(200);
	},
	
	index: function (req, res, next) {
		Device.find(function foundDevices (err, devices) {
			if (err) return next(err);
			res.view({
				devices: devices
			});
		});
	},
	
	'new': function(req, res) {
		return res.view('device/new', {
			deviceData: {}
		});
	},
	
	create: function(req, res, next) {
		console.log(req.params.all());
		var deviceObj = req.params.all();
		Device.create( deviceObj, function deviceCreated(err, device) {
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
			return res.redirect('/device/new');
		}

		device.save(function(err, device) {
			if (err) return next(err);
			res.redirect('/device/show/'+device.id);
			});
		});
	},
	
	explore: function(req, res, next) {
		console.log(req.body.ipaddress);
		var deviceXplored = DeviceXplore.explore(req.body.ipaddress);
		return res.view('device/new', {
			deviceData: deviceXplored
		});
	},
	
	show: function (req, res, next) {
		Device.findOne(req.param('id'), function foundDevice (err, device) {
			if (err) return next(err);
			if (!device) return next();
			res.view({
				device: device
			});
		});

	},
	
	edit: function (req, res, next)  {
	  Device.findOne(req.param('id'), function foundDevices (err, device) {
	    if (err) return next(err);
		if (!device) return next("Device doesn't exist.");
		res.view({
		  device: device
		});
	  });
	},
	
	update: function (req, res, next) {
	  var deviceObj = req.params.all();
	  Device.update(req.param('id'), deviceObj, function deviceUpdated (err) {
	    if (err) {
		  console.log("ERROR!!->" + err);
		  return res.redirect('/device/edit/' + req.param('id'));
		}
		res.redirect('/device');
	  });
	},
	
	destroy: function (req, res, next) {
	  Device.findOne(req.param('id'), function foundDevice (err, device) {
	    if (err) return next(err);
		
		if (!device) return next("Device doesn't exist.");
		
		Device.destroy(req.param('id'), function deviceDestroyed(err) {
		  if (err) return next(err);
		});
		
		res.redirect('device');
	  });
	}
};

