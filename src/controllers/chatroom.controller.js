// const userSchema = require('../schemas/user.schema')
// const chatRoomSchema = require('../schemas/chatroom.schema')
// const messageSchema = require('../schemas/message.schema')
// const bcrypt = require('bcryptjs')
// const crypto = require('crypto')
// const jwt = require('jsonwebtoken')
// const errorConfig = require('../../config/error.config')


// class ChatRoomController {
//     createChatRoom = async (req, res, next) => {
//         try {
//             const {name} = req.body;
            
//             const chatroomExist = await chatRoomSchema.findOne({name});
//             if (chatroomExist) throw "chatRoom with that name already exists"            //errorConfig.userExists;
    

//             const chatroom = await new chatRoomSchema({name}).save();
//             res.json({
//                 message:"Chatroom created!"
//             });
//         }
//         catch (err) {
//             next(err);
//         }
//     }

//     getAllChatrooms = async (req, res, next) => {
//         try {


//             const chatrooms = await chatRoomSchema.find({});
  
//              res.json(chatrooms);
           
//         }
//         catch (err) {
//             next(err);
//         }
//     }
    
   
// }

// module.exports = new ChatRoomController();




