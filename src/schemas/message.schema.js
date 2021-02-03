const mongoose = require('mongoose'),{Schema} = mongoose;

const messageSchema = new Schema(
	{
		chatroom: {
			type: mongoose.Schema.Types.ObjectId,
			ref:'chatroom.schema'
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref:'user.schema'
		},
		message:{
			type:String
		}
	
	});

module.exports = mongoose.model('Message', messageSchema);
