const userSchema = require('../schemas/user.schema')
const tokenSchema = require('../schemas/token.schema')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const errorConfig = require('../../config/error.config')


class UserController {
     getAll = async (req, res) => {
                const info = await userSchema.find()
                return info
        
            }
    
    create = async (req, res, next) => {
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
    
    signIn = async (req, res, next)=> {
        try {
            const data = req.body;
            const user = await userSchema.findOne({email: data.email});
            if (!user) throw errorConfig.emailOrPasswordNotFound;
    
            const match = await bcrypt.compare(process.env.AUTH_PASS_PREFIX + data.password, user.password);
            if (!match) throw errorConfig.emailOrPasswordNotFound;
    
            const token = await jwt.sign({userId: user._id, timestamp: Date.now()},process.env.AUTH_JWT_SECRET,{expiresIn: process.env.AUTH_JWT_EXP});
            // const tokenModel = new tokenSchema({
            //     owner: user._id,
            //     refreshToken: token.refreshToken,
            //     jwt: token.jwt
            // });
            
            // await tokenModel.save();
            res.json({
                message: "User logged in successfully!",
                token,
              });
        }
        catch (err) {
            res.status(403).json(err);
        }
    }
    
    signOut = (req, res, next) => {
        tokenSchema
        .remove({jwt: req.body.jwt})
        .then(result => {
            if(!result.deletedCount) throw errorConfig.defaultError;
            res.json();
        })
        .catch(err => next(err));
    }
    
   
    
   
}

module.exports = new UserController();




