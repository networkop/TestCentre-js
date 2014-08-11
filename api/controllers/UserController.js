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
	
	User.create( req.params.all(), function userCreated(err, user) {
		if (err) {
			console.log(err);
			req.session.flash = {
				err: err
			}
			
			return res.redirect('/user/new');
		}
		//res.json(user);
		res.redirect('/user/show/'+user.id);
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

	}
};

