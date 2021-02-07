const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const msgSchema = new Schema({
    senderId:   {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true
    },
    to:  { 
        type: String, 
        required: true,
        //enum: ['languages', 'literature', 'mathemathics', 'phisics', 'computer knowledge'],
    },
    text:  {
        type: String,
        required: true
    },
    created: {
        type: Date, 
        default: Date.now,
       
    }
});

module.exports = mongoose.model("Msg", msgSchema);
