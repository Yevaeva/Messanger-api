const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			sparse: true
		},
		password: {
			type: String,
			required: true
		},
		username: {
			type: String,
		},

	}
);



let User = mongoose.model('User',UserSchema)


module.exports = User