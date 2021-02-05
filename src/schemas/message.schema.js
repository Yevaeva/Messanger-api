const mongoose = require('mongoose')
const {Schema} = mongoose;
let userSchema = require('./user.schema')

const messageSchema = new Schema(
	{
		room: {
			type: String
		},
		id:{
			type:String
		},
		senderId:{
			type:String
		},
		body:{
			type:String
		},
		user: {
			type: [userSchema]
		}
	
	});

module.exports = mongoose.model('Message', messageSchema);
