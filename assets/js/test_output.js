var testOutput = function() {

	var outputArea = $('#outputArea');
	
	var updateOutput = function(textToAdd) {
		outputArea.val(outputArea.val() + textToAdd);
		outputArea.scrollTop(outputArea[0].scrollHeight);
	};
	
	var updateErrors = function(errorObj) {
		outputArea.val(outputArea.val() + "\nError: " + JSON.stringify(errorObj.text) + "; Reason: " + errorObj.reason + "\n");
		outputArea.scrollTop(outputArea[0].scrollHeight);
		switch (errorObj.reason) {
			case 'authentication':
				$('.modal #deviceID').val({ device: errorObj.device });
				$('#myModal').modal('show');
				break;
			case 'connection-timeout':
				break
			default:
				break;
			}
	};
	return {
		data : updateOutput,
		error : updateErrors
	};
}();
