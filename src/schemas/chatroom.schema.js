const mongoose = require('mongoose')
const {Schema} = mongoose;

const chatroomSchema = new Schema(
	{
		name: {
			type: String,
		}
	})
	


module.exports = mongoose.model('ChatRoom', chatroomSchema);
