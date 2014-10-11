
// store all socket connections for all users
var socketPool = {};

module.exports = {

	create: function(userID, model) {
		socketObj = new SocketObject(userID, model);
		socketPool.userID = socketPool.userID || socketObj;
		return socketObj;
	},

	abort: function(userID) {	
		if (typeof socketPool.userID !== 'undefined') {
			socketPool.userID.destroy();
		}
	}
};

function SocketObject(userID, model) {
	this.userID = userID;
	this.model = model;
};

SocketObject.prototype = {
	constructor: SocketObject,
	
	write: function(dataText, dataType) {
		var dataObj = {};
		if (!dataType) dataType = 'output';
		dataObj[dataType] = dataText;
		this.model.publishUpdate(this.userID, dataObj);
	},
	destroy: function() {
		delete socketPool.this.userID;
	}
}
