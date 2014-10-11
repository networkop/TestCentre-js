
module.exports = {
	parse: function(text, key) {
		switch(key.toLowerCase()) {
			case 'hostname':
				parseHostname(text);
				break;
			case 'alias':
				parseAlias(text);
				break;
			case 'vrf':
				parseVRF(text);
				break;
			default:
				return "Can't parse " + text;
		}
	}
};

function parseHostname(text) {
	return text.match(/^hostname\s+([A-Za-z0-9]+)/)[1];
};
function parseAlias(text) {
	var allIPs = text.match(/(\d+\.\d+\.\d+\.\d)+/g);
	return allIPs;
};
function parseVRF(text) {
	return text.match(/(\w+)\s/g);
};