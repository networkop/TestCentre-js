/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // save only the keys found in db schema
  schema: true,
	
  attributes: {
  
	name: {
		type: 'string',
		required: true,
		unique: true
	},
	email: {
		type: 'string',
		email: true,
		required: true,
		unique: true
	},
	encryptedPassword: {
		type: 'string'
	}
  }
};

