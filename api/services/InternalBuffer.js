
module.exports = {
	create: function() {
		bufferObj = new BufferProto();
		return bufferObj;
	}
}

function BufferProto() {
	this.value;
};
BufferProto.prototype = {
	write: function(text, dataType) {
		if (dataType) text = JSON.stringify(text);
		this.value += text;
	},
	destroy: function() {
		this.value = null;
	}
};