(function() {
	var form = $('#device-form');

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
	}
	
	
	form.validate(validateObject);
})();