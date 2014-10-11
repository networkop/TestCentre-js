

module.exports = {
	explore: function(remoteIP, credentials, transport) {
		var internalBuffer = InternalBuffer.create();
		var showHostname = 'show run | i hostname';
		var showAlias = 'show ip alias';
		var showVRF = 'show ip vrf';
		var remoteCommand = {
			hostname: showHostname,
			alias: showAlias,
			vrf: showVRF
		};
		var returnObj = {
			ip: remoteIP
		};
		
		_.keys(remoteCommand, function(param) {
			console.log('param' + param);
			Connection.exec({ipaddress: remoteIP}, transport, remoteCommand[param], internalBuffer, credentials);			
			returnObj[param] = CommandParser.parse(internalBuffer, param);
		});

		return returnObj;

	}
};

