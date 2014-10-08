(function() {
	var loginSubmit = $('#submitDeviceLogin');
	var submitCB = function(){
		var device =$('#login-form').find('#deviceID').val().device;
		var checkbox = $('#login-form').find('#isDefaultCheckbox').is(':checked');
		var saveFor = checkbox ? 'default' : device;
		var saveData = {}
		saveData[saveFor] = {
				login: $('#login-form').find('input[name="login_username"]').val(),
				password: $('#login-form').find('input[name="login_password"]').val()
			}
		sessionPersistSave(saveData,'loginData');
		$('#myModal').modal('toggle');
		return false;
	};
	loginSubmit.on('click', submitCB);
})();

