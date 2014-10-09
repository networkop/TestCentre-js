/**
* Device.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,
	
	attributes: {
		ipaddress: {
			type: 'string',
			required: true,
			unique: true
		},
		hostname: {
			type: 'string',
			required: true,
			unique: true
		},
		country: {
			type: 'string'
		},
		sitename: {
			type: 'string'
		},	
		vrf: {
			type: 'array'
		},	
		transportSSH: {
			type: 'boolean',
			defaultsTo: true
		},
		aliases: {
			type: 'array'
		},		
	},
	beforeCreate: function (values, next) {
		// Check that IP address is present
		if (!values.ipaddress || !values.hostname) {
		return next({err: ["IP address and Hostname are mandatory"]});
		}
		
	}
};

