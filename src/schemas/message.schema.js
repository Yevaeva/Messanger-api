const mongoose = require('mongoose')
const {Schema} = mongoose;

const messageSchema = new Schema(
	{
		room: {
			type: String
		},
		messages:[{
			type:String
		}]
	
	});

module.exports = mongoose.model('Message', messageSchema);
