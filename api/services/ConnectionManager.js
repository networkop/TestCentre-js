var sshClient = require('ssh2');


module.exports = {
	to: function(remoteDevice, transport, command, outputUserID, credentials) {
		console.log("RemoteDevice = " + remoteDevice);
		var message = '# Running ' + command + ' from ' + remoteDevice.ipaddress + ' via ' + transport + ' #';
		console.log(message);
		writeOutput(outputUserID, message);
		switch (transport) {
			case 'ssh': 
				sshExecute(remoteDevice, command, outputUserID, credentials);
				break;
			default: 
				sshExecute(remoteDevice, command, outputUserID, credentials);
		}
	},
	abort: function(outputUserID) {
		if (typeof(connectionPool.outputUserID) !== 'undefined') {
			connectionPool.outputUserID.end();
			delete connectionPool.outputUserID;
		}
	}
};

var sshExecute = function (remoteDevice, command, outputUserID, credentials) {
	var username = credentials.login || 'fake';
	var password = credentials.password || 'fake';
	var conn = new sshClient();
	connectionPool.outputUserID = conn;
	conn.on('ready', function() {
			console.log('Connection :: ready');
			conn.exec(command, function(err, stream) {
				if (err) throw err;
				stream.on('exit', function(code, signal) {
					console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
				}).on('close', function() {
					writeOutput(outputUserID, '\nDONE\n');
					conn.end();
					delete connectionPool.outputUserID;
				}).on('data', function(data) {
					writeOutput(outputUserID, "" + data);
				}).stderr.on('data', function(data) {
					console.log('STDERR: ' + data);
				});
			});
		});
	conn.on('error', function(error) {
		messageText = "Cannot connect to " + remoteDevice.ipaddress;
		Test.publishUpdate(outputUserID, { 
			error: {
				reason: error.level,
				text: messageText,
				device: remoteDevice.id
			}
		});
	});
	conn.connect({
			host: remoteDevice.ipaddress,
			port: 22,
			username: username,
			password: password
	});
};

var writeOutput = function(outputUserID, data) {
	Test.publishUpdate(outputUserID, { output: data });
};

var connectionPool = new Object();