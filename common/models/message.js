
module.exports = function(Message) {


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
    									Message.app.io.to(mess.roomId).emit('message',data);
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


	 Message.getmessages = function(room_id,cb) {
	 	console.log('getMessage function');
	 	Message.find({where:{'roomId':room_id}
	 				 ,include: 'user'},function(err,data) {
	 		//console.log(data);
      		cb(null,data);
   		});
     };

    Message.remoteMethod('getmessages', {
		accepts: [
	      {arg: 'room_id', type: 'string'}
	     ],
	    returns: {arg: 'messages', type: 'object'},
	    http: {path:'/getmessages', verb: 'get'}
	  });

};

