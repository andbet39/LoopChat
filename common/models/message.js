
module.exports = function(Message) {


	Message.sendmessage = function(content, cb) {
		console.log('sendMessage');
	    Message.create({'content':content,'posted_at':new Date()},
	      function(err,mess){
	      	Message.app.io.emit('message',mess);
	    	cb();
	    });
	   };

	  Message.remoteMethod('sendmessage', {
	    accepts: [
	      {arg: 'content', type: 'string'}
	     ],
	    returns: {arg: 'success', type: 'boolean'},
	    http: {path:'/sendmessage', verb: 'post'}
	  });

	

};

