function Buffer(outputUserID, model) {
	this.id = outputUserID;
	this.model = model;
	
	this.write = function(dataObj) {
		this.model.publishUpdate(this.id, dataObj);
	};
}
// Buffer.destroy = function(userID) {};

module.exports = Buffer;


/*
module.exports = {
	create: function(outputUserID) {
		this.outputUserID = outputUserID;
		console.log("initial userid = " + this.outputUserID);
	},
	write: function(dataObj) {
		console.log("inside socket buffer " + dataObj);
		console.log("userid = " + this.outputUserID);
		Test.publishUpdate(this.outputUserID, dataObj);
	},
	associate: function(remoteConnection) {
		connectionPool[this.outputUserID] = remoteConnection
	},
	abort: function(outputUserID) {	
		if (typeof(connectionPool[this.outputUserID]) !== 'undefined') {
			connectionPool[this.outputUserID].end();
			delete connectionPool[this.outputUserID];
		}
	},
	destroy: function(remoteConnection) {
		if (typeof(connectionPool[this.outputUserID]) !== 'undefined') {
			delete connectionPool[this.outputUserID];
		}
	}
};
*/
