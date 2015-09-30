
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

	Message.sendmessagenew = function(message,cb){
		 Message.create({'content':message.content,
		 				 'userId':message.user_id,
		 				 'roomId':message.room_id,
		 				 'posted_at':new Date()},
	      function(err,mess){
	      		Message.findById(mess.id,{
  									include: {
    								relation: 'user'}},function(err,data){
    									console.log(data);
    									Message.app.io.emit('message',data);
	    							cb();
    								});
	     	 	
	    });
	}

	Message.remoteMethod('sendmessagenew', {
		accepts: [
	      {arg: 'message', type: 'object', http: { source: 'body' }}
	     ],
	    returns: {arg: 'success', type: 'boolean'},
	    http: {path:'/sendmessagenew', verb: 'post'}
	  });


	 Message.getmessages = function(cb) {
	 	console.log('getMessage function');
	 	Message.find({include: 'user'},function(err,data) {
	 		//console.log(data);
      		cb(null,data);
   		});
     };

    Message.remoteMethod('getmessages', {
		accepts: [],
	    returns: {arg: 'messages', type: 'object'},
	    http: {path:'/getmessages', verb: 'get'}
	  });

};

