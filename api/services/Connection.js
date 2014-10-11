var sshClient = require('ssh2');


module.exports = {
	exec: function(remoteDevice, transport, command, outputBuffer, credentials) {
		console.log("RemoteDevice = " + remoteDevice.ipaddress);
		var message = '# Running ' + command + ' from ' + remoteDevice.ipaddress + ' via ' + transport + ' #';
		outputBuffer.write(message);
		console.log(message);
		switch (transport.toLowerCase()) {
			case 'ssh': 
				sshExecute(remoteDevice, command, outputBuffer, credentials);
				break;
			default: 
				sshExecute(remoteDevice, command, outputBuffer, credentials);
		}
	},

};

var sshExecute = function (remoteDevice, command, outputBuffer, credentials) {
	var username = credentials.login || 'fake';
	var password = credentials.password || 'fake';
	var conn = new sshClient();
	conn.on('ready', function() {
		console.log('Connection :: ready');
		conn.exec(command, function(err, stream) {
			if (err) throw err;
			stream.on('exit', function(code, signal) {
				console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
			}).on('close', function() {
				outputBuffer.write('\nDONE\n');
				outputBuffer.destroy();
				conn.end();
			}).on('data', function(data) {
				outputBuffer.write(data + '');
			}).stderr.on('data', function(data) {
				console.log('STDERR: ' + data);
				outputBuffer.write(data + '');
			});
		});
	});
	conn.on('error', function(error) {
		var messageText = "Cannot connect to " + remoteDevice.ipaddress;
		errorObj = {
			reason: error.level,
			text: messageText,
			device: remoteDevice.id
		};
		outputBuffer.write(errorObj, 'error');
	});
	conn.connect({
			host: remoteDevice.ipaddress,
			port: 22,
			username: username,
			password: password
	});
};

