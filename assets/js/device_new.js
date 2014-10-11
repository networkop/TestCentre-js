(function() {
	//declare variables
	var form = $('#device-form');
	var exploreButton = $('#device-form .btn-success');
	// declare callbacks
	var validateObject = {
		rules: {
			ipaddress: {
				required: true,
				ipaddress: true
			}
		},
		validClass: 'has-success glyphicon glyphicon-ok ',
		errorClass: 'has-error glyphicon glyphicon-remove',
		errorElement: "span"
	},
	exploreButtonCB = function(){
		var loginCredentials = sessionPersistFind(deviceID,'loginData') || sessionPersistFind('default','loginData') || {};
		var loginInput = $("<input>")
						.attr("type", "hidden")
						.attr("name", "login").val(loginCredentials.login);
		var passwordInput = $("<input>")
							.attr("type", "hidden")
							.attr("name", "password").val(loginCredentials.password);
		form.append($(loginInput)).append($(passwordInput));
	}
	// register callbacks
	form.validate(validateObject);
	exploreButton.on('click', exploreButtonCB)
})();