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
	admin: {
	  type: 'boolean',
	  defaultsTo: false
	},
	online: {
		type: 'boolean',
		defaultsTo: false
	},
	encryptedPassword: {
		type: 'string'
	}
  },
	beforeValidate: function (values, next) {
    if (typeof values.admin_status !== 'undefined') {
      if (values.admin_status === 'unchecked') {
        values.admin = false;
      } else  if (values.admin_status[1] === 'on') {
        values.admin = true;
      }
    }
     next();
  },
	beforeCreate: function (values, next) {
	
	// Check if the password and confirmation match
	if (!values.password || values.password != values.confirmation) {
	  return next({err: ["Password doesn't match the confirmation"]});
	}
	
	require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
	  if (err) return next(err);
	  values.encryptedPassword = encryptedPassword;
	  next();
	});
	}
};

