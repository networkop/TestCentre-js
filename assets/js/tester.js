io.socket.get('/test/subscribe', function (data) { console.log(data); });
io.socket.on('test', function (socketEvent){ 
	console.log(socketEvent); 
	updateOutput(socketEvent.data.output);
	});
var updateOutput = function(textToAdd) {
	var outputArea = $('#outputArea');
	outputArea.val(outputArea.val() + textToAdd);
};
$('#commandButton').click(function(){
  console.log('clicked button!!!')
  // your code to handle the clicks
  var href = $(this).attr('href');
  io.socket.post(href, '1', function(event) {});
  return false;
});