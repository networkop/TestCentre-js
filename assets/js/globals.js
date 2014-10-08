io.socket.get('/test/subscribe', function (data) { console.log(data); });

io.socket.on('test', function (socketEvent){ 
	console.log(socketEvent); 
	if (socketEvent.data.output) testOutput.data(socketEvent.data.output);
	else if (socketEvent.data.error) testOutput.error(socketEvent.data.error);
});



var sessionPersistSave = function(myObject,dataType) {
	sessionStorage[dataType] = JSON.stringify(myObject);
};

var sessionPersistFind = function(objectToFind, dataType) {
	if (sessionStorage.length > 0) {
		var myObject = JSON.parse(sessionStorage[dataType]);
		return  myObject ? myObject[objectToFind] : undefined;
	}
};

