/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function(req,res) {
	res.view();
	},
	
	create: function(req, res, next) {
	var userObj = req.params.all();
	delete params.admin;
	User.create( userObj, function userCreated(err, user) {
		if (err) {
			console.log(err);
			req.session.flash = {
				err: err
			}
			
			return res.redirect('/user/new');
		}
		//res.json(user);
		req.session.authenticated = true;
		req.session.User = user;
		
		user.online = true;
		user.save(function(err, user) {
			if (err) return next(err);
			res.redirect('/user/show/'+user.id);
			});
		});
	},
	
	show: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});

	},
	
	index: function (req, res, next) {
		User.find(function foundUsers (err, users) {
			if (err) return next(err);
			res.view({
				users: users
			});
		});
	},
	
	edit: function (req, res, next)  {
	  User.findOne(req.param('id'), function foundUsers (err, user) {
	    if (err) return next(err);
		if (!user) return next("User doesn't exist.");
		res.view({
		  user: user
		});
	  });
	},
	update: function (req, res, next) {
	  var userObj = req.params.all();
	  if (!req.session.User.admin) delete params.admin;
	  
	  //req.params.all() works
	  User.update(req.param('id'), userObj, function userUpdated (err) {
	    if (err) {
		  console.log("ERROR!!->" + err);
		  return res.redirect('/user/edit/' + req.param('id'));
		}
		res.redirect('/user/show/' + req.param('id'));
	  });
	},
	
	destroy: function (req, res, next) {
	  User.findOne(req.param('id'), function foundUser (err, user) {
	    if (err) return next(err);
		
		if (!user) return next("User doesn't exist.");
		
		User.destroy(req.param('id'), function userDestroyed(err) {
		  if (err) return next(err);
		});
		
		res.redirect('user');
	  });
	}
};

