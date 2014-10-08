(function() {

	var clearButton = $('#outputClear');
	var saveButton = $('#outputSave');
	var breakButton = $('#outputBreak');
	var outputText = $('#outputArea');
	
	var clearCallBack = function() {
		outputText.val('');
		return false;
	},
	saveCallBack = function() {
		var textToWrite = outputText.val();
		var textToWrite = textToWrite.replace(new RegExp(String.fromCharCode(10), 'g'), '\r\n'); 
		var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
		var date = new Date();
		var timeSuffix = date.toLocaleString();
		timeSuffix = timeSuffix.replace(/\./g, '_');
		var fileNameToSaveAs = "result " + timeSuffix ;
		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob); 
		downloadLink.click(); 
		return false;
	},
	breakCallBack = function() {
		io.socket.post('/test/break', function(event) {});
		return false;
	}
	clearButton.on('click', clearCallBack);
	saveButton.on('click', saveCallBack);
	breakButton.on('click', breakCallBack);

})();