var sshClient = require('ssh2');


module.exports = {
	to: function(remoteDevice, transport, command, socketBuffer, credentials) {
		console.log("RemoteDevice = " + remoteDevice);
		var message = '# Running ' + command + ' from ' + remoteDevice.ipaddress + ' via ' + transport + ' #';
		console.log(message);
		socketBuffer.write({ 
			output: message 
		});
		switch (transport) {
			case 'ssh': 
				sshExecute(remoteDevice, command, socketBuffer, credentials);
				break;
			default: 
				sshExecute(remoteDevice, command, socketBuffer, credentials);
		}
	}
};

var sshExecute = function (remoteDevice, command, socketBuffer, credentials) {
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
				socketBuffer.write({ output: '\nDONE\n'});
				conn.end();
			}).on('data', function(data) {
				socketBuffer.write({ output: data + ''});
			}).stderr.on('data', function(data) {
				console.log('STDERR: ' + data);
			});
		});
	});
	conn.on('error', function(error) {
		messageText = "Cannot connect to " + remoteDevice.ipaddress;
		errorObject =  { 
			error: {
				reason: error.level,
				text: messageText,
				device: remoteDevice.id
			}
		};
		socketBuffer.write(error)
	});
	conn.connect({
			host: remoteDevice.ipaddress,
			port: 22,
			username: 'mkashin',
			password: 'MmgN3tw0rk007'
	});
};

