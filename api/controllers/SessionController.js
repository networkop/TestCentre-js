/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
module.exports = {
	'new': function(res, res) {
	  res.view('session/new')
	},
	
	create: function(req, res, next) {
	// Check if email and password are both setActive
	if (!req.param('email') || !req.param('password')) {
	  var usernamePasswordRequiredError = [{
		name: 'usernamePasswordRequired', 
		message: 'You must enter both username and password'
	  }]
	  // that error is the object passed to flash.err
	  req.session.flash = {
	    err: usernamePasswordRequiredError
	  }
	  res.redirect('/session/new');
	  return;
	}
	
	//Try to find user by email address
	// findOneByEmail() - dynamic finder, searches model by particular attribute
	User.findOneByEmail(req.param('email'), function foundUser(err, user) {
	  if (err) return next(err);
	  if (!user) {
	    var noAccountError = [{
			name: 'noAccount', 
			message: 'The email address' + req.param('email') + 'not found'
		}]
		req.session.flash = {
		  err: noAccountError
		}
		res.redirect('/session/new');
		return;
	  }

	  bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
	    if (err) return next(err);
		if (!valid)  {
		  var usernamePasswordMismatchError = [{
			name:'usernamePasswordMismatch', 
			message: 'Invalid password'
		}]
		  req.session.flash = {
		    err: usernamePasswordMismatchError
		  }
		  res.redirect('/session/new');
		  return;
		}
		// Log user in
		req.session.authenticated = true;
		req.session.User = user;
		
		user.online = true;
		user.save(function(err, user) {
			if (err) return next(err);
		// if user is admin
		if (req.session.User.admin) {
		  res.redirect('/');
		  return;
		}
		
		// redirect to the profile page 
		res.redirect('/user/show/' + user.id);
		});
	  });
 	});
	},
	
	destroy: function(req, res, next) {
	  var userId = req.session.User.id;
	  
	  User.update(userId, {online: false}, function(err) {
		if (err) return next(err);

		req.session.destroy();
	  
		res.redirect('/session/new');
		});
	
	}
};

