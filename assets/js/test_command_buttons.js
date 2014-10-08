(function() {
	var table = $('#table');
	var addRowButton = $('#addRow');
	var commandButton = 'a.commandButton';
	var deleteRowButton = 'a.deleteRow';
	var selectDevice = $('.selectDevice');
	
	var commandButtonCB = function() {
		var href = $(this).attr('href');
		// get the source device ID from URI
		var deviceID = href.match(/\/\w+\/(\d+)\/\w+\/\d+/)['1'];
		// Extract Login credentials for by either deviceID or default
		var loginCredentials = sessionPersistFind(deviceID,'loginData') || sessionPersistFind('default','loginData') || {};
		io.socket.post(href, loginCredentials, function(event) {console.log(event)});
		return false;
	},
	deleteRowButtonCB = function() {
		var href = $(this).attr('href');
		$(this).closest("tr").remove();
		return false;
	},
	selectDeviceButtonCB = function() {
		var selectedOption = $(this);
		var defaultOption = $(this).closest("div.btn-group").find("button.dropdown-toggle");
		defaultOption.html(selectedOption.text() + '   ' + '<span class="caret"></span>');
		var roleID = selectedOption.attr('id');
		var deviceID = selectedOption.attr('href').split("/")[1];
		localStorage.setItem(roleID, JSON.stringify([deviceID,selectedOption.text()]));
		defaultOption.dropdown("toggle");
		return false;
	},
	addRowButtonCB = function() {
		$('#table tr:last').after(addTableRow());
		return false;
	},
	addTableRow = function() {
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
	table.on('click', commandButton, commandButtonCB);
	table.on('click', deleteRowButton, deleteRowButtonCB);
	addRowButton.on('click', addRowButtonCB);
	selectDevice.on('click', selectDeviceButtonCB);
})();


