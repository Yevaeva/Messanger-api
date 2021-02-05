const userSchema = require('../schemas/user.schema')
const chatRoomSchema = require('../schemas/chatroom.schema')
const messageSchema = require('../schemas/message.schema')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const errorConfig = require('../../config/error.config')


class ChatRoomController {
    createMsg = async (req, res, next) => {
        try {
            const data = req.body;
            const isUserExist = await userSchema.findOne({email: data.email});
            if (isUserExist) throw errorConfig.userExists;
    
            const pass = await  bcrypt.hash(process.env.AUTH_PASS_PREFIX + data.password, +process.env.AUTH_PASS_SALT_ROUNDS);

            const newUser = {
                email: data.email,
                password: pass,
                name: data.name,
                surname: data.surname,
            };
            const user = await new userSchema(newUser).save();
            const retUser = { email: user.email, name: user.name, surname:user.surname};
            res.json(retUser);
        }
        catch (err) {
            next(err);
        }
    }
    
    createChatRoom = async (req, res, next) => {
        try {
            const {name} = req.body;
            
            const chatroomExist = await chatRoomSchema.findOne({name});
            if (chatroomExist) throw "chatRoom with that name already exists"            //errorConfig.userExists;
    

            const chatroom = await new chatRoomSchema({name}).save();
            res.json({
                message:"Chatroom created!"
            });
        }
        catch (err) {
            next(err);
        }
    }

    getAllChatrooms = async (req, res, next) => {
        try {


            const chatrooms = await chatRoomSchema.find({});
  
             res.json(chatrooms);
           
        }
        catch (err) {
            next(err);
        }
    }
    
   
}

module.exports = new ChatRoomController();




