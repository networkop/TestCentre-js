module.exports = {
	cisco: function(command, sourceDevice, destDevice) {
		var result;
		result = command + " " + destDevice.ipaddress;
		return result;
	}
};