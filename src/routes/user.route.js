
const express = require('express'),
auth = require('../middlewares/auth.middleware'),
userController = require('../controllers/user.controller'),
userRouter = express.Router();

/**
* Аll routes start with '/user'
**/
 userRouter.get('/:email', userController.getOne);


// Create a new user
userRouter.post('/',  userController.create);



// Sign in
userRouter.post('/sign-in',  userController.signIn);





module.exports = userRouter;

