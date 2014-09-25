io.socket.get('/test/subscribe', function (data) { console.log(data); });
io.socket.on('test', function (socketEvent){ 
	console.log(socketEvent); 
	if (socketEvent.data.output) updateOutput(socketEvent.data.output);
	else if (socketEvent.data.error) updateErrors(socketEvent.data.error);
	});
var updateOutput = function(textToAdd) {
	var outputArea = $('#outputArea');
	outputArea.val(outputArea.val() + textToAdd);
	outputArea.scrollTop(outputArea[0].scrollHeight);
};
var updateErrors = function(errorObj) {
	var outputArea = $('#outputArea');
	outputArea.val(outputArea.val() + "\nerror " + JSON.stringify(errorObj));
	outputArea.scrollTop(outputArea[0].scrollHeight);
	switch (errorObj.reason) {
		case 'authentication':
			$.prompt("Hello World!");
			break;
		case 'connection-timeout':
			break
		default:
			break;
		}
};

$('#table').on('click', 'a.commandButton', function(){
	console.log('clicked button');
	console.log($(this).attr('href'));
	var href = $(this).attr('href');
	io.socket.post(href, function(event) {console.log(event)});
	return false;
});

$('#outputClear').on('click', function(){
	$('#outputArea').val('');
	return false;
});

$('#outputSave').on('click', function(){
	var textToWrite = $('#outputArea').val();
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
});

$('#outputBreak').on('click', function(){
	io.socket.post('/test/break', function(event) {});
	return false;
});

$('#table').on('click', 'a.deleteRow', function(){
	var table = $('#table');
	var href = $(this).attr('href');
	$(this).closest("tr").remove();
	return false;
});

$('.selectDevice').on('click', function(){
	console.log('selected device');
	var selectedOption = $(this);
	var defaultOption = $(this).closest("div.btn-group").find("button.dropdown-toggle");
	defaultOption.html(selectedOption.text() + '   ' + '<span class="caret"></span>');
	var roleID = selectedOption.attr('id');
	var deviceID = selectedOption.attr('href').split("/")[1];
	localStorage.setItem(roleID, JSON.stringify([deviceID,selectedOption.text()]));
	console.log(localStorage);
	defaultOption.dropdown("toggle");
	return false;
});


$('#addRow').on('click', function(){
	$('#table tr:last').after(addTableRow());
	return false;
});

var addTableRow = function() {
	sourceObj = JSON.parse(localStorage.getItem('source'));
	destObj = JSON.parse(localStorage.getItem('destination'));
	html = '<tr>'
	html += "<td><a href='#' class='deleteRow'><span class='glyphicon glyphicon-remove-circle'></span></a></td>";
	html += "<td>" + sourceObj[1] + "</td>";
	html += "<td><a href='/device/" + sourceObj[0] + "/ping/" + destObj[0] + "' class='commandButton'>" + destObj[1] + "</a></td>"
	html += "<td><a href='/device/" + sourceObj[0] + "/trace/" + destObj[0] + "' class='commandButton'>" + destObj[1] + "</a></td>"
	html += '</tr>'
	return html;
}

